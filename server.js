// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/approvers', async (req, res) => {
  try {
    // Step 1: Get OAuth token
    const tokenRes = await fetch(
      'https://at-development-hgv7q18y.authentication.us10.hana.ondemand.com/oauth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'password',
          username: process.env.SAP_USERNAME,
          password: process.env.SAP_PASSWORD,
          client_id: process.env.SAP_CLIENT_ID,
          client_secret: process.env.SAP_CLIENT_SECRET,
        }),
      }
    );

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error('Token error:', text);
      throw new Error(`Token request failed: ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Fetch approvers from OData endpoint
    const dataRes = await fetch(
      'https://the-hackett-group-d-b-a-answerthink--inc--at-development1a73fa6.cfapps.us10.hana.ondemand.com/odata/v4/supplier/Approvers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!dataRes.ok) {
      const errorText = await dataRes.text();
      console.error('API error:', errorText);
      throw new Error(`Data fetch failed: ${dataRes.status}`);
    }

    const result = await dataRes.json();
    res.json(result.value); // OData wraps data in .value
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).json({ error: 'Failed to fetch approvers' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});