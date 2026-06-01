# Grocery Discovery — AI-Assisted Shopping
**UX Research → Product Design → Full-Stack Engineering**

> A usability study of 8 Instacart shoppers revealed that the platform fails users with dietary, cultural, and budget constraints. This project turns those findings into a working product: semantic search, dietary filtering, budget transparency, and a Claude-powered AI chatbot.

**Author:** Anel Bazarbayeva  
**Course:** CS663 — Human Factors & Usability Metrics, Pace University (team project)  
**Personal extension:** Semantic search API, React frontend, AI chatbot (solo, post-course)  
**Stack:** Python · FastAPI · scikit-learn · React 18 · Vite · Claude API  
**Team (research phase):** Anel Bazarbayeva, Ashiyah, Andrew, Younes

---

## The Research

8 moderated usability sessions (40–50 min each). 4 experienced, 4 novel online grocery shoppers. Think-aloud protocol via Zoom. Task 3 deliberately restricted search to expose browsing behaviour.

### What We Found

**Finding 01 — Familiarity drives everything**  
8/8 users chose a store they already knew — before the page finished loading. Nobody used the homepage store cards to compare. Store selection happened in their heads.

> *"If it's cereal or spices, I'd try a deal. But for salmon or shrimp — no. I'm getting it from a place I feel comfortable."*

**Finding 02 — Search is a single point of failure**  
Search was so dominant that every browsing weakness stayed hidden — until Task 3 removed it. Verbal frustration, false negatives, and slower completion immediately followed.

> *"I'm lost, because the quickest way for me to search that information… I need the search bar."*

**Finding 03 — Categories don't match mental models**  
Multiple participants looked for pasta under "Bakery." "Pantry" reads as a storage location, not a product type. The real-world store aisle is the mental model.

> *"I don't even know what that would fall under."*

**Finding 04 — Filters failed users**  
0 users found a price filter. 3 gave up on dietary filters. Only 1 store had a gluten-free filter. "Grain Free" vs "Gluten Free" inconsistency eroded trust.

> *"Not gonna lie, losing a little bit of hope."*

**Finding 05 — The card is the product page**  
Most users never opened product detail pages. Missing from cards: halal badges, gluten-free labels, nutritional highlights, certification info.

> *"Why don't they have a label for low sodium?"*

**Finding 06 — Budget means total delivered cost**  
Users know item price is not the final price. One participant questioned whether items were truly under budget after fees, tip, and tax. Transparency was absent.

**Finding 07 — The platform wasn't built for everyone**  
One participant searched for Ghanaian butter bread across three stores — no results — and planned a separate in-person trip. One halal shopper could not verify certification at Target. These aren't edge cases.

**Finding 08 — Store pages are visually overwhelming**  
Users described being "blasted with products." Most never used the left sidebar. Search became an escape from layout complexity.

→ Full findings with evidence and quotes: [`research/FINDINGS.md`](research/FINDINGS.md)  
→ Methodology, recruitment, and session plan: [`research/METHODOLOGY.md`](research/METHODOLOGY.md)

---

## The Personal Extension

After the class project concluded, I built a working prototype to implement the design solutions the research identified:

| Research finding | What I built |
|---|---|
| Filters failed users | Dietary filter system (halal, vegan, gluten-free), stackable |
| Budget opacity | Budget estimator: subtotal + delivery fee + tip + tax per store |
| Cultural food gaps | Product catalog with halal, West African, and specialty items |
| Card information missing | Product cards with dietary tags and store shown by default |
| Search dependency | Semantic search so browsing works without exact keyword match |
| Platform wasn't built for everyone | AI chatbot that understands dietary context and cultural queries |

---

## What Was Built

### Backend (FastAPI + scikit-learn)
- **Semantic search** — TF-IDF with cosine similarity; upgrade path to `sentence-transformers` documented
- **Dietary filtering** — halal, vegan, gluten-free, stackable
- **Budget estimation** — real per-store fee structure, free delivery threshold logic
- **16 tests passing**

### Frontend (React 18 + Vite)
- Product grid with live search + filter + results from API
- Sidebar: dietary pills, price slider, store selector, AI Picks toggle
- Budget bar — live cost breakdown as items are added to cart
- **AI chatbot** — Claude-powered assistant, aware of the full product catalog, dietary needs, and budget context *(requires Anthropic API key — see setup)*

---

## Project Structure

```
instacart-discovery/
├── api/
│   ├── main.py          # FastAPI app — 4 endpoints
│   ├── search.py        # TF-IDF semantic search engine
│   └── budget.py        # Cost estimation with per-store fee structure
├── data/
│   ├── products.json    # 20-product catalog across 4 stores
│   └── build_index.py   # Builds search index (run once before API)
├── tests/
│   └── test_api.py      # 16 tests — search, filters, budget
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
│   ├── FINDINGS.md      # All 8 findings with quotes and evidence
│   └── METHODOLOGY.md   # Recruitment, session plan, analysis approach
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

### AI Chatbot
The chatbot calls the Anthropic API directly from the browser in development.  
For production, proxy it through your backend to keep the key server-side.

```bash
# frontend/.env.local
VITE_API_URL=        # leave blank for local dev (uses Vite proxy)
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
| GET | `/products/search` | Semantic search + dietary/store/price filters |
| POST | `/budget` | Full cost estimate with per-store fee logic |

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

## Deploy to Render (free)

1. Push this repo to GitHub
2. [render.com](https://render.com) → New Web Service → connect repo
3. Render auto-detects `render.yaml` → Deploy
4. Set `VITE_API_URL` in `frontend/.env.local` to your live URL

---

## Upgrade Path

Swap TF-IDF for full semantic embeddings:
```bash
pip install sentence-transformers
```
```python
# In data/build_index.py — replace TfidfVectorizer with:
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
```

---

*Research conducted at Pace University, CS663 — Human Factors & Usability Metrics.  
Personal engineering extension by Anel Bazarbayeva.  
Design inspired by modern grocery e-commerce — not affiliated with Instacart.*
