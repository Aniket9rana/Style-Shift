require('dotenv').config();
const express = require('express');
const cors = require('cors');
const transformRoute = require('./routes/transform');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api', transformRoute);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(process.env.PORT || 3001, () =>
  console.log(`STYLESHIFT backend running on port ${process.env.PORT || 3001}`)
);
