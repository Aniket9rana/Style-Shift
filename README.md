# StyleShift

> AI-powered photo style transformer — transforms your photos into 16 artistic styles using Google Gemini

## Monorepo Structure

```
Style-Shift/
├── backend/    # Node.js + Express REST API
└── frontend/   # React + Vite web app
```

## Quick Start

**Backend**
```bash
cd backend
npm install
cp .env.example .env   # fill in your API keys
npm run dev            # runs on http://localhost:3001
```

**Frontend**
```bash
cd frontend
npm install
npm run dev            # runs on http://localhost:5173
```

See each folder's README for full setup and deployment instructions.
