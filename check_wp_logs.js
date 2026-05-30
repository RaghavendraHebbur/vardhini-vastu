const { spawn } = require('child_process');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

function runWPMCP() {
  const child = spawn('npx.cmd', ['-y', '@automattic/mcp-wordpress-remote'], { env, shell: true });
  let buffer = '';
  child.stdout.on('data', (data) => { buffer += data.toString(); processBuffer(); });
  let idCounter = 1;
  const callbacks = {};

  function sendRequest(method, params = {}) {
    const id = idCounter++;
    const request = { jsonrpc: '2.0', id, method, params };
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
      } catch (e) {}
    }
  }

  return { sendRequest, kill: () => child.kill() };
}

async function main() {
  const mcp = runWPMCP();
  try {
    await mcp.sendRequest('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'antigravity', version: '1.0.0' } });
    
    // PHP to get latest errors from debug.log
    const phpCode = `
      $log_file = WP_CONTENT_DIR . '/debug.log';
      if (file_exists($log_file)) {
          // Get last 20 lines
          $lines = file($log_file);
          $last_lines = array_slice($lines, -20);
          echo json_encode(["status" => "success", "log" => implode("", $last_lines)]);
      } else {
          echo json_encode(["status" => "error", "message" => "debug.log not found. Enable WP_DEBUG_LOG."]);
      }
    `;

    const response = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: { ability_name: "novamira/execute-php", parameters: { code: phpCode } }
    });

    console.log(JSON.stringify(response, null, 2));
    mcp.kill();
  } catch (err) {
    mcp.kill();
  }
}

setTimeout(main, 2000);
