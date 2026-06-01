# Grocery Discovery — AI-Assisted Shopping
**UX Research → Product Design → Full-Stack Engineering**

> A usability study of 8 Instacart shoppers revealed that the platform systematically fails users with dietary, cultural, and budget constraints. This repo documents the research — and the working product I built from its findings.

| | |
|---|---|
| **Research** | CS663 — Human Factors & Usability Metrics, Pace University (team) |
| **Engineering** | Personal extension — solo, post-course |
| **Research team** | Anel Bazarbayeva, Ashiyah, Andrew, Younes |
| **Stack** | Python · FastAPI · scikit-learn · React 18 · Vite · Claude API |

---

## Two Parts to This Project

### Part 1 — The Research (Team, Pace University)

A moderated usability study conducted with 8 participants across 40–50 minute Zoom sessions. Think-aloud protocol. Task 3 deliberately restricted search to expose browsing behaviour the platform's reliance on search normally hides.

**Course:** CS663 — Human Factors & Usability Metrics  
**Deliverables:** Usability plan, session facilitation, thematic analysis, design recommendations, final presentation

→ [`research/FINDINGS.md`](research/FINDINGS.md) — all 8 findings with participant quotes and evidence  
→ [`research/METHODOLOGY.md`](research/METHODOLOGY.md) — recruitment, session plan, analysis approach  
→ [`research/Instacart_Usability_Study_Final.pdf`](research/Instacart_Usability_Study_Final.pdf) — final presentation deck  
→ [`research/Instacart_Usability_Study_Draft.pdf`](research/Instacart_Usability_Study_Draft.pdf) — working draft

### Part 2 — The Engineering Extension (Solo, Anel Bazarbayeva)

After the course ended, I built a working prototype to implement what the research recommended. Every feature maps directly to a finding.

| Research finding | What I built |
|---|---|
| Filters failed users | Dietary filter system — halal, vegan, gluten-free, stackable |
| Budget opacity | Budget estimator — subtotal + delivery fee + tip + tax per store |
| Cultural food gaps | Catalog with halal, West African, and specialty items |
| Card information missing | Product cards with dietary tags and store visible by default |
| Search dependency | Semantic search so browsing works without exact keyword match |
| Platform wasn't built for everyone | AI chatbot aware of dietary needs and cultural food queries |

This extension was not part of the course. It represents my independent decision to take research findings and ship them as code.

---

## What Was Built

### Backend — FastAPI + scikit-learn
- **`api/search.py`** — TF-IDF semantic search with cosine similarity. Accepts natural language queries like "halal meals under $10" and returns ranked results
- **`api/budget.py`** — Real cost estimation with per-store delivery fee structures, free delivery thresholds, tip and tax calculation. Directly addresses the research finding that item price alone is misleading
- **`api/main.py`** — 4 REST endpoints, CORS enabled, fully documented via FastAPI's `/docs`
- **16 tests passing** — search accuracy, filter logic, budget math

### Frontend — React 18 + Vite
- Product grid with real-time search → filter → results pulled from the API
- Sidebar: dietary filter pills, price range slider, store selector, AI Picks toggle
- Budget bar — live cost breakdown appears as items are added to cart
- **AI chatbot** — Claude API integration (requires Anthropic API key, see setup)

> The chatbot requires an Anthropic API key. In production, proxy the request through your backend so the key stays server-side. See setup below.

---

## Key Research Findings

**8/8 users chose a familiar store before the page finished loading.** Store selection happened in their heads, not on the screen.

**0 users found a price filter.** 3 gave up on dietary filters. Only 1 store had a gluten-free option.

**Most users never opened a product detail page.** The card is the product page — but halal badges, gluten-free labels, and nutritional info weren't on it.

**One participant searched for Ghanaian butter bread across three stores.** No results. Accepted Hawaiian rolls as a substitute. Planned a separate in-person trip. This isn't an edge case — it's a design failure.

**Users evaluate budget as total delivered cost.** Item price without fees, tip, and tax is misleading. One participant questioned whether items were truly under budget before adding them.

---

## Project Structure

```
instacart-discovery/
├── api/
│   ├── main.py          # FastAPI app — 4 endpoints
│   ├── search.py        # TF-IDF semantic search engine
│   └── budget.py        # Cost estimation with per-store fee logic
├── data/
│   ├── products.json    # 20-product catalog across 4 stores
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
├── research/
│   ├── FINDINGS.md                          # 8 findings with quotes + evidence
│   ├── METHODOLOGY.md                       # Recruitment, sessions, analysis
│   ├── Instacart_Usability_Study_Final.pdf # Final presentation
│   └── Instacart_Usability_Study_Draft.pdf # Working draft
└── render.yaml          # One-click Render deployment
```

---

## Quick Start

### Backend
```bash
pip install -r requirements.txt
python data/build_index.py
uvicorn api.main:app --reload
# API docs: http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
# Proxies /api → http://localhost:8000
```

### AI Chatbot setup
```bash
# frontend/.env.local
VITE_API_URL=    # leave blank for local dev
```
The chatbot calls the Anthropic API directly in development. For production, move the API call to your backend.

### Tests
```bash
pytest tests/ -v
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/products` | Full catalog |
| GET | `/products/search` | Semantic search + dietary / store / price filters |
| POST | `/budget` | Full cost estimate with per-store fee structure |

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
2. [render.com](https://render.com) → New Web Service → connect repo
3. Render reads `render.yaml` automatically → Deploy
4. Set `VITE_API_URL` in `frontend/.env.local` to your live Render URL

---

## Upgrade Path

To use full semantic embeddings in production:
```bash
pip install sentence-transformers
```
Replace `TfidfVectorizer` in `data/build_index.py` with `SentenceTransformer("all-MiniLM-L6-v2")`. Everything else stays the same.

---

*Research conducted at Pace University, CS663 — Human Factors & Usability Metrics, Spring 2026.  
Engineering extension by Anel Bazarbayeva — independent, post-course.  
Not affiliated with Instacart.*
