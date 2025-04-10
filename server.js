const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // allow requests from anywhere
app.use(bodyParser.json());

app.post("/proxy", async (req, res) => {
  try {
    const { url, method = "GET", headers = {}, body = null } = req.body;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    const result = await response.text();
    res.status(response.status).send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Tassomai Proxy running on port " + port);
});
