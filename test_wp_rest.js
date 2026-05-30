const fs = require('fs');

const WP_URL = "https://vardhinivastu.in/wp-json/wp/v2/pages";
const WP_USER = "raghu.hebbur@gmail.com";
const WP_PASS = "AD1vSJeLlP8fMcArlSZqcU2K";

async function main() {
  const auth = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
  
  const payload = {
    title: "Test Page Direct API",
    content: "<!-- wp:html --><div class=\"vv\">Hello from direct REST API!</div><!-- /wp:html -->",
    status: "publish",
    slug: "test-page-direct-api"
  };

  try {
    const res = await fetch(WP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response ID:", data.id);
    if (!res.ok) {
        console.error("Error:", data);
    }
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

main();
