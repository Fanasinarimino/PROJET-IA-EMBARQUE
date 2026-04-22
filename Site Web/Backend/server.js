const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// A remplacer
const CHANNEL_ID = 'VOTRE_CHANNEL_ID';
const READ_API_KEY = 'VOTRE_READ_API_KEY';

app.get('/api/weather', async (req, res) => {
    try {
        const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=10`;
        const response = await axios.get(url);
        
        // On renvoie les données brutes et les infos du canal
        res.json({
            location: response.data.channel.name,
            feeds: response.data.feeds
        });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
});

app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));