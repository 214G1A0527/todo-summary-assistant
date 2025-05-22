const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

// GET /todos - Fetch all todos
app.get('/todos', async (req, res) => {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST /todos - Add new todo
app.post('/todos', async (req, res) => {
    const { text } = req.body;
    const { data, error } = await supabase
        .from('todos')
        .insert([{ text, completed: false }])
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Todo deleted' });
});

// PATCH /todos/:id/toggle - Toggle completion
app.patch('/todos/:id/toggle', async (req, res) => {
    const { id } = req.params;

    const { data: todo, error: fetchError } = await supabase
        .from('todos')
        .select()
        .eq('id', id)
        .single();

    if (fetchError || !todo)
        return res.status(404).json({ message: 'Todo not found' });

    const { data, error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// PATCH /todos/:id - Edit todo text
app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const { data, error } = await supabase
        .from('todos')
        .update({ text })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST /summarize - Summarize todos and send to Slack
app.post('/summarize', async (req, res) => {
    const cohereApiKey = process.env.COHERE_API_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!cohereApiKey || !slackWebhookUrl) {
        return res.status(500).json({ error: 'Missing LLM or Slack configuration' });
    }

    // Get all pending todos from Supabase
    const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .eq('completed', false);

    if (error) return res.status(500).json({ error: error.message });

    if (!todos || todos.length === 0) {
        return res.status(400).json({ message: 'No pending todos to summarize' });
    }

    const prompt = `Summarize these todos:\n${todos.map(t => `- ${t.text}`).join('\n')}`;

    try {
        // Call Cohere API for summary
        const cohereResponse = await axios.post(
            'https://api.cohere.ai/v1/generate',
            {
                model: 'command',
                prompt,
                max_tokens: 100,
                temperature: 0.5,
            },
            {
                headers: {
                    Authorization: `Bearer ${cohereApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const summary = cohereResponse.data.generations[0].text.trim();

        // Post summary to Slack
        await axios.post(slackWebhookUrl, { text: summary });

        res.json({ success: true, summary });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to generate summary or send to Slack' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
