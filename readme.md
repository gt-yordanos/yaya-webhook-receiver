<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Project Structure</title>
  <style>
    body {
      background-color: #0f172a;
      color: #e2e8f0;
      font-family: "Fira Code", monospace;
      display: flex;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background-color: #1e293b;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 600px;
    }

    h2 {
      margin-top: 0;
      color: #38bdf8;
      font-size: 1.5rem;
      text-align: center;
    }

    pre {
      background-color: #0f172a;
      padding: 15px;
      border-radius: 10px;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
      font-size: 14px;
      margin: 0;
    }

    code {
      color: #cbd5e1;
      font-family: inherit;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .container {
        padding: 15px;
      }
      pre {
        font-size: 13px;
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <h1 align="center">
    <img src="https://play-lh.googleusercontent.com/Ui8o3sP8Ycapx6nnZE3NbVTsg-JkcCra98yDeI_wEzBCTaNSFWxnQrggCUelbagQ8g" alt="YaYa Wallet Logo" width="60" style="vertical-align: middle; margin-right: 10px;" />
    YaYa Wallet Webhook Receiver
  </h1>

  <p align="center">
    <img src="https://i0.wp.com/compositecode.blog/wp-content/uploads/2018/07/1200px-node-js_logo.png?fit=863%2C528&ssl=1" alt="Node.js Logo" width="200" style="margin-right: 15px;" />
    <img src="https://www.softude.com/wp-content/uploads/36.webp" alt="Express Logo" width="200"/>
  </p>

  
  <p>
    This project is a <span class="highlight">Node.js + Express webhook receiver</span> for YaYa Wallet.
    It is designed to securely receive and process transaction events in real-time while fulfilling the coding test requirements.
  </p>

  <hr>

  <h2>Problem-Solving Approach</h2>

  <h3>Step 1: Understanding the Requirements</h3>
  <p>The task was to implement a webhook endpoint that:</p>
  <ul>
    <li>Receives <code>POST</code> requests with transaction data from YaYa Wallet.</li>
    <li>Verifies the request is authentic using <strong>HMAC SHA-256 signature</strong>.</li>
    <li>Prevents <strong>replay attacks</strong> and <strong>duplicate event processing</strong>.</li>
    <li>Responds quickly to webhook events.</li>
  </ul>

  <h3>Step 2: Choosing Packages and Tools</h3>
  <ul>
    <li><strong>Express</strong>: Handles HTTP requests and routing.</li>
    <li><strong>Body-parser</strong>: Parses incoming JSON payloads.</li>
    <li><strong>CORS</strong>: Handles cross-origin requests from YaYa Wallet.</li>
    <li><strong>Crypto</strong>: Computes HMAC SHA-256 signatures for request verification.</li>
    <li><strong>Axios</strong>: Simulates webhook requests for local testing.</li>
    <li><strong>dotenv</strong>: Manages environment variables like <code>WEBHOOK_SECRET</code>.</li>
  </ul>

  <h3>Step 3: Choosing Data Structures and Algorithms</h3>
  <ul>
    <li><strong>Set</strong>: An in-memory <code>Set</code> stores processed event IDs to prevent duplicates efficiently.</li>
    <li><strong>Timestamp comparison</strong>: Ensures webhook timestamps are within a <strong>5-minute tolerance</strong> to prevent replay attacks.</li>
    <li><strong>HMAC SHA-256</strong>: Uses <code>crypto.createHmac()</code> to verify the webhook signature.</li>
  </ul>

  <h3>Step 4: Implementation Plan</h3>
  <p><strong>Webhook Middleware: <code>verifySignatureMiddleware</code></strong></p>
  <ul>
    <li>Extracts <code>yaya-signature</code> from headers.</li>
    <li>Computes the expected HMAC SHA-256 signature.</li>
    <li>Compares signatures and blocks unauthorized requests.</li>
  </ul>

  <p><strong>HTTPS verification middleware: <code>httpsOnly</code></strong></p>
  <p><em>(Originally included HTTPS verification middleware, but commented it out for local testing.)</em></p>

  <p><strong>Webhook Controller: <code>webhookController</code></strong></p>
  <ul>
    <li>Checks timestamp to prevent replay attacks.</li>
    <li>Validates if the event ID is already processed.</li>
    <li>Logs the payload for demonstration purposes.</li>
    <li>Responds quickly with a <code>200</code> status code.</li>
  </ul>

  <p><strong>Routing</strong></p>
  <p>Used <strong>Express Router</strong> to attach the middleware to the webhook route.</p>

  <p><strong>Testing</strong></p>
  <p>The <code>sendWebhook.js</code> script uses Axios to simulate YaYa Wallet sending webhook events.</p>

  <h3>Step 5: Security and Reliability Measures</h3>
  <ul>
    <li><strong>HMAC verification</strong>: Ensures events originate from YaYa Wallet.</li>
    <li><strong>Replay attack prevention</strong>: Rejects events older than <strong>5 minutes</strong>.</li>
    <li><strong>Duplicate prevention</strong>: Uses <code>Set</code> to ensure each event is processed once.</li>
    <li><strong>Quick <code>2xx</code> response</strong>: Returns success before heavy processing to prevent retries.</li>
  </ul>

  <div class="container">
    <h2>📂 Project Structure</h2>
    <pre><code>yaya-webhook-receiver/
│
├─ src/
│  ├─ index.js             # Express server
│  ├─ routes/
│  │  └─ webhook.js        # Webhook route
│  ├─ controllers/
│  │  └─ webhookController.js  # Webhook handler logic
│  └─ middlewares/
│     └─ verifySignature.js    # Signature verification middleware
│
├─ scripts/
│  └─ sendWebhook.js       # Test script to send sample webhook
│
├─ .env                    # Environment variables
├─ package.json
└─ README.md</code></pre>
  </div>

  <div>

  <h2>⚙️ Setup Instructions</h2>

  <p><strong>Clone the repository:</strong></p>
  <pre><code>git clone &lt;repo_url&gt;
cd yaya-webhook-receiver
  </code></pre>

  <p><strong>Install dependencies:</strong></p>
  <pre><code>npm install
  </code></pre>

  <p><strong>Create a <code>.env</code> file:</strong></p>
  <pre><code>PORT=5000
WEBHOOK_SECRET=your_secret_key_here
  </code></pre>

  <p><strong>Start the server:</strong></p>
  <pre><code>npm start
  </code></pre>

  <p><strong>Test webhook locally:</strong></p>
  <pre><code>npm run sendwebhook
  </code></pre>

  <p>Logs the payload in the server console.</p>

  <p><strong>Returns:</strong></p>
  <pre><code>{
  "success": true,
  "message": "Webhook processed"
}
  </code></pre>

  <h2>📌 Webhook Endpoint</h2>

  <p><strong>POST</strong> <code>/webhook</code></p>
  <p><strong>Headers:</strong> <code>yaya-signature</code> (HMAC SHA-256 signature)</p>

  <p><strong>Sample payload:</strong></p>
  <pre><code>{
  "id": "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
  "amount": 100,
  "currency": "ETB",
  "created_at_time": 1673381836,
  "timestamp": 1701272333,
  "cause": "Testing",
  "full_name": "Abebe Kebede",
  "account_name": "abebekebede1",
  "invoice_url": "https://yayawallet.com/en/invoice/xxxx"
}
  </code></pre>

  <h2>🧪 Testing Approach</h2>

  <ul>
    <li><strong>Local testing:</strong> Used <code>sendWebhook.js</code> with Axios to simulate incoming webhook requests.</li>
    <li><strong>Signature validation:</strong> Verified payload HMAC SHA-256 using <code>crypto</code>.</li>
    <li><strong>Replay and duplicates:</strong> Checked timestamps and event IDs.</li>
    <li><strong>Quick response:</strong> Ensured 2xx response is returned before processing heavy logic.</li>
    <li><strong>HTTPS middleware:</strong> Commented out for local testing, enabled in production.</li>
  </ul>

</div>

</body>
</html>

