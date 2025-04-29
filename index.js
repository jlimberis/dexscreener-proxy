const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow any site (like Google Sheets) to fetch from this server

const PORT = process.env.PORT || 3000;

// Main dynamic endpoint
app.get('/trending', async (req, res) => {
  try {
    const query = req.query.q || 'sol';

    const response = await axios.get(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trending tokens.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
