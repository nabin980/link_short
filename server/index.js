const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = 3005;

app.use(bodyParser.json());
app.use(cors());

app.post('/shorten-url', async (req, res) => {
    const { longUrl } = req.body;
    const accessToken = "479654f5339ae9939f2add976b16475d9bcd338f"; // Replace with your Bitly access token

    try {
        const shortenedUrl = await shortenUrl(longUrl, accessToken);
        if (shortenedUrl) {
            res.status(200).json({ shortenedUrl });
        } else {
            res.status(500).json({ error: 'Failed to shorten URL' });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function shortenUrl(longUrl, accessToken) {
    const endpoint = "https://api-ssl.bitly.com/v4/shorten";
    const headers = {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    };
    const data = {
        "long_url": longUrl,
        "domain": "bit.ly"
    };

    try {
        const response = await axios.post(endpoint, data, { headers });
        return response.data.link;
    } catch (error) {
        console.error("Failed to shorten URL:", error.response.status, error.response.statusText);
        throw error;
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
