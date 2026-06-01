# Grocery Discovery — AI-Assisted Shopping
**UX Research → Product Design → Full-Stack Engineering**

> From an 8-participant usability study to a working full-stack app with semantic search, dietary filtering, budget transparency, and an AI chatbot.

**Author:** Anel Bazarbayeva  
**Stack:** Python · FastAPI · scikit-learn · React 18 · Vite · Claude API  
**Status:** Working prototype · Ready to deploy

---

## The Problem

A graduate usability study (8 participants, 40–50 min moderated sessions on Instacart) revealed consistent pain points:

| Finding | Impact |
|---|---|
| No dietary filtering for halal/cultural foods | Users abandoned searches |
| Price opacity — hidden fees revealed at checkout | Trust breakdown |
| Poor natural language search | "West African soup" → no results |
| No personalized recommendations | High cognitive load |

This project addresses all four.

---

## What Was Built

### Backend (FastAPI + scikit-learn)
- **Semantic search** — TF-IDF vectorizer with cosine similarity over 20 real products
- **Dietary filtering** — halal, vegan, gluten-free, stackable
- **Budget estimation** — subtotal + delivery fee (free over threshold) + tip + tax per store
- **16 tests passing** — search, filters, budget math

### Frontend (React + Vite)
- Product grid with real-time search → filter → results
- Sidebar filters: dietary tags, price slider, store selector
- AI Picks mode — highlights contextually matched products
- Budget bar — live cost estimate as you add to cart
- **AI chatbot** (Claude-powered) — ask about meals, dietary needs, budget

---

## Project Structure

```
instacart-discovery/
├── api/
│   ├── main.py          # FastAPI app — 4 endpoints
│   ├── search.py        # TF-IDF semantic search engine
│   └── budget.py        # Cost estimation with per-store fees
├── data/
│   ├── products.json    # 20-product catalog, 4 stores
│   └── build_index.py   # Builds search index (run once)
├── tests/
│   └── test_api.py      # 16 tests
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       ├── ProductGrid.jsx
│   │       ├── BudgetBar.jsx
│   │       └── ChatBot.jsx   # Claude API integration
│   └── package.json
├── render.yaml          # One-click Render deployment
└── requirements.txt
```

---

## Quick Start

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Build search index (required before starting API)
python data/build_index.py

# Start API server
uvicorn api.main:app --reload

# API docs available at:
# http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev

# Runs at http://localhost:5173
# Proxies /api → http://localhost:8000
```

### Run tests
```bash
pytest tests/ -v
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/products` | Full catalog |
| GET | `/products/search` | Semantic search + filters |
| POST | `/budget` | Cost estimate |

**Search example:**
```
GET /products/search?q=halal+chicken&dietary=halal&max_price=10
```

**Budget example:**
```json
POST /budget
{
  "items": [{"price": 6.99, "quantity": 1}, {"price": 8.49, "quantity": 2}],
  "store": "ShopRite"
}
```

---

## Deploy to Render (free tier)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Render auto-detects `render.yaml` — click **Deploy**
5. Your API will be live at `https://your-app.onrender.com`

Update `frontend/.env.local`:
```
VITE_API_URL=https://your-app.onrender.com
```

---

## Research Foundation

| Method | Details |
|---|---|
| Moderated usability testing | 8 participants, 40–50 min sessions |
| Think-aloud protocol | Screen + audio recording via UserTesting.com |
| Semi-structured interviews | Post-task debrief |
| Thematic analysis | Coded across 6 overarching themes |
| Nielsen heuristic evaluation | Accessibility audit |

---

## Upgrade Path

To use full semantic embeddings (production quality):
```bash
pip install sentence-transformers
```

Then swap in `data/build_index.py`:
```python
# Replace TfidfVectorizer with:
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
```

---

*Built as part of a portfolio case study. Design inspired by modern grocery e-commerce — not affiliated with Instacart.*
