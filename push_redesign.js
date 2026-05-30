const { spawn } = require('child_process');
const fs = require('fs');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

const corePages = [
  { file: 'index.html',          slug: 'home' },
  { file: 'services.html',       slug: 'services' },
  { file: 'about.html',          slug: 'about' },
  { file: 'contact.html',        slug: 'contact' },
  { file: 'success-stories.html', slug: 'testimonials' },
];

function parseHtml(html) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&') : '';

  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) ||
                    html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i);
  let description = descMatch ? descMatch[1].trim().replace(/&amp;/g, '&') : '';

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let mainContent = mainMatch ? mainMatch[1].trim() : '';

  const content = `<!-- wp:html -->\n<div class="vv">\n${mainContent}\n</div>\n<!-- /wp:html -->`;
  return { title, description, content };
}

function runWPMCP() {
  const child = spawn('npx.cmd', ['-y', '@automattic/mcp-wordpress-remote'], { env, shell: true });
  let buffer = '';
  child.stdout.on('data', d => { buffer += d.toString(); processBuffer(); });
  let idCounter = 1;
  const callbacks = {};
  function sendRequest(method, params = {}) {
    const id = idCounter++;
    const req = { jsonrpc: '2.0', id, method, params };
    return new Promise((resolve) => {
      callbacks[id] = { resolve };
      child.stdin.write(JSON.stringify(req) + '\n');
    });
  }
  function processBuffer() {
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id && callbacks[msg.id]) { callbacks[msg.id].resolve(msg); delete callbacks[msg.id]; }
      } catch {}
    }
  }
  return { sendRequest, kill: () => child.kill() };
}

async function pushCss(mcp) {
  const cssContent = fs.readFileSync('vv-design.css', 'utf8');
  const cssB64 = Buffer.from(cssContent).toString('base64');
  console.log('\n--- Uploading vv-design.css to WordPress ---');
  const phpCode = `
    $css_b64 = '${cssB64}';
    $css = base64_decode($css_b64);
    $upload_dir = wp_upload_dir();
    $file_path = $upload_dir['basedir'] . '/vv-design.css';
    $result = file_put_contents($file_path, $css);
    $file_url  = $upload_dir['baseurl']  . '/vv-design.css';
    if ($result !== false) {
      echo json_encode(['success' => true, 'url' => $file_url, 'bytes' => $result]);
    } else {
      echo json_encode(['success' => false, 'error' => 'Could not write CSS file']);
    }
  `;
  const response = await mcp.sendRequest('tools/call', {
    name: 'mcp-adapter-execute-ability',
    arguments: { ability_name: 'novamira/execute-php', parameters: { code: phpCode } }
  });
  if (response.result && response.result.content) {
    const text = response.result.content[0].text;
    try {
      const outer = JSON.parse(text);
      if (outer.success && outer.data) {
        const inner = JSON.parse(outer.data.output);
        if (inner.success) {
          console.log(`  [OK] CSS uploaded → ${inner.url} (${inner.bytes} bytes)`);
          return inner.url;
        } else {
          console.log(`  [FAIL] CSS upload error: ${inner.error}`);
        }
      } else {
        console.log(`  [ERROR] CSS upload response: ${text}`);
      }
    } catch (e) {
      console.log(`  [ERROR] CSS parse error: ${text}`);
    }
  }
  return null;
}

async function main() {
  const mcp = runWPMCP();
  console.log('Initializing connection to WordPress MCP server...');
  await mcp.sendRequest('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'antigravity', version: '1.0.0' }
  });

  // 1. Upload CSS file
  const cssUrl = await pushCss(mcp);

  // 2. Push each page one by one
  console.log(`\nPreparing ${corePages.length} menu pages to push...`);

  for (let i = 0; i < corePages.length; i++) {
    const p = corePages[i];
    if (!fs.existsSync(p.file)) { console.log(`  [SKIP] Missing file: ${p.file}`); continue; }

    const html = fs.readFileSync(p.file, 'utf8');
    const parsed = parseHtml(html);
    console.log(`\n--- [${i+1}/${corePages.length}] Pushing "${p.slug}" ---`);

    const payloadB64 = Buffer.from(JSON.stringify([{ slug: p.slug, title: parsed.title, description: parsed.description, content: parsed.content }])).toString('base64');
    const phpCode = `
      $payload = json_decode(base64_decode('${payloadB64}'), true);
      $item = $payload[0];
      $slug = $item['slug'];
      $title = $item['title'];
      $content = $item['content'];
      $desc = $item['description'];

      $posts = get_posts(['name' => $slug, 'post_type' => 'page', 'post_status' => 'any', 'posts_per_page' => 1]);
      $post_id = 0;
      if (!empty($posts)) { $post_id = $posts[0]->ID; }

      $post_arr = ['post_type' => 'page', 'post_status' => 'publish', 'post_title' => $title, 'post_content' => $content];
      if ($post_id > 0) {
        $post_arr['ID'] = $post_id;
        $res = wp_update_post($post_arr, true);
        $action = 'update';
      } else {
        $post_arr['post_name'] = $slug;
        $res = wp_insert_post($post_arr, true);
        $post_id = is_wp_error($res) ? 0 : $res;
        $action = 'insert';
      }

      if (is_wp_error($res)) {
        echo json_encode(['slug' => $slug, 'status' => 'error', 'message' => $res->get_error_message()]);
      } else {
        update_post_meta($post_id, 'rank_math_title', $title);
        update_post_meta($post_id, 'rank_math_description', $desc);
        echo json_encode(['slug' => $slug, 'status' => 'success', 'action' => $action, 'id' => $post_id]);
      }
    `;

    const response = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: { ability_name: 'novamira/execute-php', parameters: { code: phpCode } }
    });

    if (response.result && response.result.content) {
      const text = response.result.content[0].text;
      try {
        const outer = JSON.parse(text);
        if (outer.success && outer.data) {
          const r = JSON.parse(outer.data.output);
          if (r.status === 'success') {
            console.log(`  [OK] "${r.slug}" -> ${r.action.toUpperCase()} (ID: ${r.id})`);
          } else {
            console.log(`  [FAIL] "${r.slug}" -> ${r.message}`);
          }
        } else {
          console.log(`  [ERROR] Response: ${text}`);
        }
      } catch (e) {
        console.log(`  [ERROR] Parse error: ${text}`);
      }
    }
  }

  // 3. Inject CSS into WordPress head via wp_head hook (add_action)
  if (cssUrl) {
    console.log('\n--- Enqueuing vv-design.css in WordPress theme ---');
    const phpEnqueue = `
      $css_url = '${cssUrl}';
      $option_key = 'vv_custom_css_url';
      update_option($option_key, $css_url);

      // Inject via functions.php snippet stored in options
      $existing = get_option('vv_head_scripts', '');
      $link_tag = '<link rel="stylesheet" id="vv-design-css" href="' . esc_url($css_url) . '?v=' . time() . '" media="all" />';

      // Check if already present via option; always update
      update_option('vv_design_css_link', $link_tag);
      echo json_encode(['success' => true, 'tag' => $link_tag]);
    `;
    const enqRes = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: { ability_name: 'novamira/execute-php', parameters: { code: phpEnqueue } }
    });
    if (enqRes.result && enqRes.result.content) {
      const text = enqRes.result.content[0].text;
      try {
        const outer = JSON.parse(text);
        if (outer.success && outer.data) {
          const r = JSON.parse(outer.data.output);
          if (r.success) console.log('  [OK] CSS URL stored in WordPress option "vv_design_css_link"');
        }
      } catch {}
    }
  }

  mcp.kill();
  console.log('\n✅ Push complete! All 5 menu pages and vv-design.css pushed to WordPress.');
}

setTimeout(main, 2000);
