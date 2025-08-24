const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = 3000;

const NEWS_API_KEY = 'da02f546ec0242e8a609ccb750097b8a'; // Replace with your actual NewsAPI key

// Enable CORS for all origins (allow frontend on different port)
app.use(cors());

// Endpoint to get the latest news
app.get('/news', async (req, res) => {
    try {
        // Fetch news from News API
        const response = await axios.get(`https://newsapi.org/v2/everything?q=india&apiKey=${NEWS_API_KEY}`);
        
        // Send back the response data to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
