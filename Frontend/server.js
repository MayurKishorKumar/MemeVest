import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Define a route to proxy requests
app.get("/api/price", async (req, res) => {
  const { ids, vs_currencies } = req.query;

  if (!ids || !vs_currencies) {
    return res.status(400).json({ error: "Missing 'ids' or 'vs_currencies' query parameters" });
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vs_currencies}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});