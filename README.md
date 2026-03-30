# StyleShift Backend

> AI-powered photo style transformer — Express REST API backend

StyleShift takes a photo and transforms it into one of 16 artistic styles (Studio Ghibli, Van Gogh, Cyberpunk, Film Noir, and more) using Google Gemini's image generation API. Results are stored permanently on Cloudinary and returned to the frontend as CDN URLs.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 20+ |
| Framework | Express 4 |
| Image Generation | Google Gemini 2.5 Flash Image |
| Image Storage | Cloudinary v2 |
| Rate Limiting | express-rate-limit |
| CORS | cors |
| Env Variables | dotenv |

---

## Project Structure

```
styleshift-backend/
├── routes/
│   └── transform.js          # POST /api/transform
├── services/
│   ├── geminiService.js       # Image transformation via Gemini API
│   └── cloudinaryService.js   # Upload original + result to Cloudinary
├── middleware/
│   ├── rateLimiter.js         # 3 requests/day per IP (free plan)
│   └── validateRequest.js     # Validate image + style on every request
├── utils/
│   └── stylePrompts.js        # 16 style definitions (prompt + negativePrompt)
├── .env.example               # Template — copy to .env and fill in keys
├── index.js                   # Express entry point
└── package.json
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Aniket9rana/Style-Shift.git
cd Style-Shift
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```env
# Google Gemini (requires billing enabled on Google AI Studio)
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 4. Run the server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3001`

---

## API Reference

### `POST /api/transform`

Transforms an image into the selected artistic style.

**Request Body**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "style": "studio-ghibli"
}
```

**Success Response `200`**
```json
{
  "success": true,
  "originalUrl": "https://res.cloudinary.com/.../original.jpg",
  "transformedUrl": "https://res.cloudinary.com/.../transformed.jpg",
  "style": "studio-ghibli",
  "processingTime": 8432
}
```

**Error Response `4xx / 5xx`**
```json
{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED | INVALID_IMAGE | UNSUPPORTED_STYLE | API_ERROR | STORAGE_ERROR | QUOTA_EXCEEDED",
  "message": "Human readable message"
}
```

### `GET /health`

Health check endpoint.

```json
{ "status": "ok" }
```

---

## Available Styles

### Cinema
| ID | Style |
|---|---|
| `netflix-dark` | Netflix Dark Cinematic |
| `nolan-film` | Christopher Nolan IMAX |
| `wes-anderson` | Wes Anderson Pastel |
| `tarantino` | Tarantino 35mm |

### Animation
| ID | Style |
|---|---|
| `studio-ghibli` | Studio Ghibli |
| `anime` | Anime |
| `pixar-3d` | Pixar 3D |
| `disney-classic` | Disney Classic |

### Art
| ID | Style |
|---|---|
| `van-gogh` | Van Gogh |
| `monet` | Monet Impressionist |
| `watercolor` | Watercolor |
| `cyberpunk-art` | Cyberpunk |

### Era
| ID | Style |
|---|---|
| `80s-retro` | 80s Retro / Synthwave |
| `vaporwave` | Vaporwave |
| `film-noir` | Film Noir |
| `renaissance` | Renaissance Oil Painting |

---

## Request Pipeline

```
POST /api/transform
        │
        ▼
1. validateRequest   → check image (base64, <10MB) + valid style ID
        │
        ▼
2. rateLimiter       → max 3 requests/day per IP
        │
        ▼
3. geminiService     → send image + style prompt to Gemini 2.5 Flash Image
        │
        ▼
4. cloudinaryService → upload original + transformed image to Cloudinary
        │
        ▼
5. Response          → return both CDN URLs + processingTime
```

---

## Deployment

### Backend → Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add all environment variables from `.env` in Railway's dashboard
4. Set `FRONTEND_URL` to your Vercel frontend URL
5. Railway auto-deploys on every push

### Frontend → Vercel

The React frontend lives in a separate repo. Set `VITE_API_URL` to your Railway backend URL.

---

## Rate Limiting

Free plan allows **3 image transforms per day per IP**. This resets every 24 hours.
To increase the limit, edit `middleware/rateLimiter.js`:

```js
max: 3,  // change this
windowMs: 24 * 60 * 60 * 1000  // 24 hours
```

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (from [aistudio.google.com](https://aistudio.google.com)) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Server port (default: 3001) |
| `FRONTEND_URL` | Allowed CORS origin (your frontend URL) |

---

## License

MIT
