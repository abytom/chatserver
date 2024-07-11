const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
