# AI-Assisted Grocery Discovery
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![UX Research](https://img.shields.io/badge/UX%20Research-6C63FF?style=flat-square&logoColor=white)
![AI Discovery](https://img.shields.io/badge/AI%20Discovery-FF6B6B?style=flat-square&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-16%20passing-22c55e?style=flat-square)

**UX Research → Findings → Figma Redesign → Working Prototype → Interactive AI Demo**

> A usability study of 8 Instacart shoppers revealed that the platform creates barriers for users with dietary, cultural, and budget constraints. This repo documents the research — and the working product I built from its findings.

| | |
|---|---|
| **Research** | CS663 — Human Factors & Usability Metrics, Pace University (team) |
| **Engineering** | Personal extension — solo, post-course |
| **Research team** | Anel Bazarbayeva, Ashiyah, Andrew, Younes |
| **Stack** | Python · FastAPI · scikit-learn · React 18 · Vite · Claude API |

---

## 🎥 Interactive Concept Preview

[Watch the 30-second concept preview](https://drive.google.com/file/d/1tUpi1GYBu3C0GgBaXUeNgv8Lk2hF-HKq/view?usp=sharing)

This prototype demonstrates how research findings were translated into an AI-assisted grocery discovery experience focused on search, dietary filtering, and budget transparency.

## Two Parts to This Project

### Part 1 — The Research (Team, Pace University)

A moderated usability study conducted with 8 participants across 40–50 minute Zoom sessions. Think-aloud protocol. Task 3 deliberately restricted search to expose browsing behavior that the platform's reliance on search normally hides.

**Course:** CS663 — Human Factors & Usability Metrics  
**Deliverables:** Usability plan, session facilitation, thematic analysis, design recommendations, final presentation

→ [`research/FINDINGS.md`](research/FINDINGS.md) — all 8 findings with participant quotes and evidence  
→ [`research/METHODOLOGY.md`](research/METHODOLOGY.md) — recruitment, session plan, analysis approach  
→ [`research/Instacart Presentation.pdf`](research/Instacart%20Presentation.pdf) — final presentation deck

### Part 2 — The Engineering Extension (Solo, Anel Bazarbayeva)

After the course ended, I built a working prototype to implement what the research recommended. Every feature maps directly to a finding.

| Research finding | What I built |
|---|---|
| Filters failed users | Dietary filter system — halal, vegan, gluten-free, stackable |
| Budget opacity | Budget estimator — subtotal + delivery fee + tip + tax per store |
| Cultural food gaps | Catalog with halal, West African, and specialty items |
| Card information missing | Product cards with dietary tags and store visible by default |
| Search dependency | Natural-language product search using TF-IDF similarity |
| Users with dietary and cultural needs faced discovery barriers | AI-assisted grocery discovery experience |

This engineering extension was completed independently after the course concluded.

---

## What Was Built

### Backend — FastAPI + scikit-learn
- **`api/search.py`** — Natural-language product search using TF-IDF similarity with cosine ranking. Accepts queries like "halal meals under $10" and returns ranked results
- **`api/budget.py`** — Real cost estimation with per-store delivery fee structures, free delivery thresholds, tip and tax calculation. Directly addresses the research finding that item price alone is misleading
- **`api/main.py`** — 4 REST endpoints, CORS enabled, fully documented via FastAPI's `/docs`
- **16 tests passing** — search accuracy, filter logic, budget math

### Frontend — React 18 + Vite
- Product grid with real-time search → filter → results pulled from the API
- Sidebar: dietary filter pills, price range slider, store selector, AI Picks toggle
- Budget bar — live cost breakdown appears as items are added to cart
- AI chat interface — Supports an optional Claude-powered experience when an Anthropic API key is configured. The interface is designed for dietary, cultural, nutritional, and budget-based grocery discovery.
  
---

## Key Research Findings

<details>
<summary><strong>01 — 8/8 users chose a familiar store before the page finished loading</strong></summary>
<br>

Store selection happened in their heads, not on the screen. Nobody used the homepage store cards to compare. Trust drives store choice — not price or availability.

> *"If it's cereal or spices, I'd try a deal. But for salmon or shrimp — no. I'm getting it from a place I feel comfortable."*

**Design implication:** Any nudge toward new stores must address the trust gap, not just highlight price.

</details>

<details>
<summary><strong>02 — 0 users found a price filter. 3 gave up on dietary filters</strong></summary>
<br>

Only 1 store had a gluten-free filter. "Grain Free" vs "Gluten Free" inconsistency eroded trust. "Shop by Preference" was buried — no participant found it unprompted.

> *"Not gonna lie, losing a little bit of hope."*

**Design implication:** Dietary and price filters should be standardized across all stores and surfaced at the top of every category page.

</details>

<details>
<summary><strong>03 — Most users never opened a product detail page</strong></summary>
<br>

The card is the product page. Users made purchase decisions from the thumbnail alone. Missing from cards: halal badges, gluten-free labels, nutritional highlights, certification info.

> *"Why don't they have a label for low sodium?"*

**Design implication:** Key dietary and nutritional signals must live on the card, not behind a click.

</details>

<details>
<summary><strong>04 — One participant searched for Ghanaian butter bread across three stores. No results</strong></summary>
<br>

She accepted Hawaiian rolls as a substitute and planned a separate in-person trip. One halal shopper could not verify certification at Target. These aren't edge cases — they're trust barriers blocking purchase.

**Design implication:** Halal and kosher certification data, cultural food synonyms, and specialty store partnerships are not nice-to-haves.

</details>

<details>
<summary><strong>05 — Users evaluate budget as total delivered cost, not item price</strong></summary>
<br>

One participant questioned whether items were truly under budget after taxes, delivery fees, and tip. One found cheaper oil elsewhere but paused — estimated delivery fees would cancel the savings.

**Design implication:** Show estimated total cost alongside item prices during constrained shopping.

</details>

<details>
<summary><strong>06 — Search was so dominant that browsing failures stayed hidden until Task 3</strong></summary>
<br>

Task 3 deliberately restricted search. Verbal frustration and false negatives immediately followed. Every browsing weakness surfaced at once.

> *"I'm lost, because the quickest way for me to search that information… I need the search bar."*

**Design implication:** Category browsing needs to function as a real fallback, not a dead end.

</details>

→ All 8 findings with full evidence and quotes: [`research/FINDINGS.md`](research/FINDINGS.md)

---

## Prototype Status

This is a working research-driven prototype, not a production Instacart integration. The backend search, filters, product catalog, and budget estimation are functional. The Claude-powered chat requires an Anthropic API key. Future improvements include stronger embeddings, deployed hosting, expanded product data, and AI-generated match explanations.

---

## Screenshots 

### AI-Assisted Grocery Discovery

<p align="center">
  <img src="screenshots/ai-assistant-desktop.png" width="700">
</p>

This concept shows how users can ask natural-language grocery questions and receive product recommendations grounded in dietary, cultural, and budget needs.

### Budget Transparency

<p align="center">
  <img src="screenshots/budget-transparency-desktop.png" width="700">
</p>

Research participants evaluated affordability using total delivered cost rather than item price alone. This design exposes delivery fees, taxes, tips, and estimated totals before checkout.

### Mobile Discovery Experience

<p align="center">
  <img src="screenshots/mobile-discovery.png" width="180">
</p> 

The mobile concept adapts conversational product discovery, dietary filtering, and budget awareness for a grocery shopping workflow on smaller screens.

---

## Project Structure

```
instacart-discovery/
├── api/
│   ├── main.py          # FastAPI app — 4 endpoints
│   ├── search.py        # TF-IDF search engine
│   └── budget.py        # Cost estimation with per-store fee logic
│
├── data/
│   ├── products.json    # 20-product catalog across 4 stores
│   └── build_index.py   # Builds search index
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       ├── ProductGrid.jsx
│   │       ├── BudgetBar.jsx
│   │       └── ChatBot.jsx
│   └── package.json
│
├── research/
│   ├── FINDINGS.md
│   ├── METHODOLOGY.md
│   ├── Instacart_Usability_Study_Final.pdf
│   └── Instacart_Usability_Study_Draft.pdf
│
├── screenshots/
│   ├── ai-assistant-desktop.png
│   ├── budget-transparency-desktop.png
│   ├── mobile-discovery.png
│   ├── prototype-overview.png
│   └── ai-assistant-concept-preview.mov
│
├── tests/
│   └── test_api.py      # 16 tests
│
├── requirements.txt
├── render.yaml
└── README.md
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
VITE_API_URL=                              # leave blank for local dev
VITE_ANTHROPIC_API_KEY=your_api_key_here  # get from console.anthropic.com
```
Claude-powered chat is available when an Anthropic API key is configured. Without it, all other features — search, filters, budget — work fully. For production, proxy the API call through your backend to keep the key server-side.

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
| GET | `/products/search` | TF-IDF search + dietary / store / price filters |
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
