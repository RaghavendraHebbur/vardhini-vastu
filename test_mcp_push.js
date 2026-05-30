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
    console.error('STDERR:', data.toString());
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
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
        } else {
            console.log("UNHANDLED MSG:", msg);
        }
      } catch (e) {
        console.log("PARSE ERR on line:", line);
      }
    }
  }

  return { sendRequest, kill: () => child.kill() };
}

async function main() {
  const mcp = runWPMCP();

  try {
    console.log("Initializing connection to WordPress MCP server...");
    const initRes = await mcp.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'antigravity-test', version: '1.0.0' }
    });
    console.log("Init response:", JSON.stringify(initRes, null, 2));

    const phpCode = `
        echo json_encode(["success" => true, "data" => "Hello from WordPress via MCP!"]);
    `;

    console.log("Executing PHP...");
    const response = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: {
        ability_name: "novamira/execute-php",
        parameters: {
          code: phpCode
        }
      }
    });

    console.log("PHP Execution Response:", JSON.stringify(response, null, 2));

    mcp.kill();
  } catch (err) {
    console.error("Fatal Error:", err);
    mcp.kill();
  }
}

setTimeout(main, 2000);
