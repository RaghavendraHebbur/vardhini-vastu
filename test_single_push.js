const { spawn } = require('child_process');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

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

  child.stderr.on('data', (data) => {
    // console.error(data.toString());
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
      }
    }
  }

  return { sendRequest, kill: () => child.kill() };
}

async function main() {
  const mcp = runWPMCP();

  try {
    console.log("Initializing connection to WordPress MCP server...");
    await mcp.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'antigravity', version: '1.0.0' }
    });

    const phpCode = `
      $post_arr = [
          'post_type' => 'page',
          'post_status' => 'publish',
          'post_title' => 'Test Page Post',
          'post_content' => 'This is a test post to check if posting works.',
          'post_name' => 'test-page-post-xyz'
      ];
      
      $res = wp_insert_post($post_arr, true);
      
      if (is_wp_error($res)) {
          echo json_encode(["status" => "error", "message" => $res->get_error_message()]);
      } else {
          echo json_encode(["status" => "success", "id" => $res]);
      }
    `;

    console.log("Pushing test page to remote WordPress...");
    const response = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: {
        ability_name: "novamira/execute-php",
        parameters: {
          code: phpCode
        }
      }
    });

    console.log("Response:", JSON.stringify(response, null, 2));
    mcp.kill();
    console.log("Push complete!");

  } catch (err) {
    console.error("Fatal Error:", err);
    mcp.kill();
  }
}

setTimeout(main, 2000);
