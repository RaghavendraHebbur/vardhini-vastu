const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

const corePages = [
  { file: 'index.html', slug: 'home' },
  { file: 'about.html', slug: 'about' },
  { file: 'services.html', slug: 'services' },
  { file: 'contact.html', slug: 'contact' },
  { file: 'success-stories.html', slug: 'testimonials' },
  { file: 'in.html', slug: 'in' },
  { file: 'disclaimer.html', slug: 'disclaimer' },
  { file: 'privacy-policy.html', slug: 'privacy-policy' },
  { file: 'terms.html', slug: 'terms' }
];

function getPagesPayload() {
  const payload = [];

  corePages.forEach(p => {
    if (!fs.existsSync(p.file)) {
      console.log(`Core file missing: ${p.file}`);
      return;
    }
    const html = fs.readFileSync(p.file, 'utf8');
    const parsed = parseHtml(html, p.file);
    
    // For 'home' slug, WordPress uses 'home' internally but serves it at the root.
    // Rank Math titles, desc, etc should still be updated.
    payload.push({
      slug: p.slug,
      title: parsed.title,
      description: parsed.description,
      content: parsed.content
    });
  });

  return payload;
}

function parseHtml(html, filePath) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : "";
  title = title.replace(/&amp;/g, '&');

  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) || 
                    html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i);
  let description = descMatch ? descMatch[1].trim() : "";
  description = description.replace(/&amp;/g, '&');

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let mainContent = mainMatch ? mainMatch[1].trim() : "";
  
  const content = `<!-- wp:html -->\n<div class="vv">\n${mainContent}\n</div>\n<!-- /wp:html -->`;

  return { title, description, content };
}

function runWPMCP() {
  const child = spawn('npx.cmd', ['-y', '@automattic/mcp-wordpress-remote'], { 
    env,
    shell: true
  });

  let buffer = '';
  child.stdout.on('data', (data) => {
    buffer += data.toString();
    processBuffer();
  });

  let idCounter = 1;
  const callbacks = {};

  function sendRequest(method, params = {}) {
    const id = idCounter++;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };
    return new Promise((resolve, reject) => {
      callbacks[id] = { resolve, reject };
      child.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  function processBuffer() {
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id && callbacks[msg.id]) {
          callbacks[msg.id].resolve(msg);
          delete callbacks[msg.id];
        }
      } catch (e) {
        // Ignored
      }
    }
  }

  return { sendRequest, kill: () => child.kill() };
}

async function main() {
  const pages = getPagesPayload();
  console.log(`Prepared ${pages.length} core pages to push.`);

  const mcp = runWPMCP();

  try {
    console.log("Initializing connection to WordPress MCP server...");
    await mcp.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'antigravity', version: '1.0.0' }
    });

    const batchSize = 1;
    const totalBatches = Math.ceil(pages.length / batchSize);

    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      console.log(`\n--- Pushing Batch ${batchNum}/${totalBatches} (${batch.length} pages) ---`);

      const payloadBase64 = Buffer.from(JSON.stringify(batch)).toString('base64');
      const phpCode = `
        $payload_b64 = '${payloadBase64}';
        $payload = json_decode(base64_decode($payload_b64), true);
        $results = [];
        
        foreach ($payload as $item) {
            $slug = $item['slug'];
            $title = $item['title'];
            $content = $item['content'];
            $desc = $item['description'];
            
            // Find post by slug
            $posts = get_posts([
                'name' => $slug,
                'post_type' => 'page',
                'post_status' => 'any',
                'posts_per_page' => 1
            ]);
            
            $post_id = 0;
            if (!empty($posts)) {
                $post_id = $posts[0]->ID;
            }
            
            $post_arr = [
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => $title,
                'post_content' => $content
            ];
            
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
                $results[] = [
                    'slug' => $slug,
                    'status' => 'error',
                    'message' => $res->get_error_message()
                ];
            } else {
                update_post_meta($post_id, 'rank_math_title', $title);
                update_post_meta($post_id, 'rank_math_description', $desc);
                
                $kw = str_replace(' | Vardhini Vastu', '', $title);
                $kw = str_replace('Best Vastu Consultant in ', '', $kw);
                $kw = str_replace('Expert Vastu Consultant in ', '', $kw);
                $kw = trim(str_replace(' | Online Scientific Vastu', '', $kw));
                $kw = trim(str_replace(' | Scientific Vastu Shastra', '', $kw));
                update_post_meta($post_id, 'rank_math_focus_keyword', "Vastu Consultant " . $kw);
                
                $results[] = [
                    'slug' => $slug,
                    'status' => 'success',
                    'action' => $action,
                    'id' => $post_id
                ];
            }
        }
        echo json_encode($results);
      `;

      const response = await mcp.sendRequest('tools/call', {
        name: 'mcp-adapter-execute-ability',
        arguments: {
          ability_name: "novamira/execute-php",
          parameters: {
            code: phpCode
          }
        }
      });

      if (response.result && response.result.content) {
        const text = response.result.content[0].text;
        try {
          const resultObj = JSON.parse(text);
          if (resultObj.success && resultObj.data) {
            const batchResults = JSON.parse(resultObj.data.output);
            batchResults.forEach(r => {
              if (r.status === 'success') {
                console.log(`  [OK] Slug: "${r.slug}" -> ${r.action.toUpperCase()} (ID: ${r.id})`);
              } else {
                console.log(`  [FAIL] Slug: "${r.slug}" -> Error: ${r.message}`);
              }
            });
          } else {
            console.log("  [ERROR] Execution failed:", text);
          }
        } catch (err) {
          console.log("  [ERROR] Failed to parse response:", text);
        }
      } else {
        console.log("  [ERROR] Empty or invalid response:", JSON.stringify(response, null, 2));
      }
    }

    mcp.kill();
    console.log("\nPush complete!");

  } catch (err) {
    console.error("Fatal Error:", err);
    mcp.kill();
  }
}

setTimeout(main, 2000);
