# Usability Study Findings — Instacart
**CS663: Human Factors & Usability Metrics · Pace University**  
**Team:** Anel Bazarbayeva, Ashiyah, Andrew, Younes · Spring 2026

---

## Study Overview

| | |
|---|---|
| **Application** | Instacart (desktop, instacart.com) |
| **Method** | Moderated remote usability testing + semi-structured interview |
| **Protocol** | Think-aloud, 1:1 sessions via Zoom, screen-sharing enabled |
| **Participants** | 8 total — 4 experienced online grocery shoppers, 4 novel users |
| **Session length** | 40–50 minutes each |
| **Tasks** | 3 tasks, increasing constraint (Task 3: search restricted) |
| **Recording** | Video + audio, post-study transcription and thematic coding |

---

## Participant Profiles

| Persona | Description |
|---|---|
| Home Cook | Feeding family on a budget |
| Nutrition Focused | Checks calories before price |
| Vegetarian | Weekly shopper saving time |
| Halal Shopper | Needs certification to trust |
| Brand Loyal | Knows her brands, one store |
| Specialty Hunter | Late-night delivery user |
| Deal-Driven | Chasing loyalty points |
| Quality First | Halal, then price |

---

## Task Descriptions

**Task 1:** Do a grocery run for the week. Pick a store and add: milk, eggs, bread, and chicken breast.
*(Vegan/vegetarian alternative: bread, broccoli, sugar, rice)*

**Task 2:** Search for cooking oil and find the option that gives you the best value. Add to cart.

**Task 3 (search restricted):** Find and add three specific items on a budget — organic dairy-free milk under $6, gluten-free pasta under $5, and low-sodium canned soup under $4.

---

## Finding 01 — Familiarity & Routine
*Human-Centred Finding*

Users default to familiar stores — trust, not comparison, drives store selection.

**Evidence:**
- 8/8 participants chose a store they already knew — before the page finished loading
- 4 participants entered their store with no hesitation
- No participant used the homepage store cards to compare options
- Loyalty programs and past purchase history reinforced store lock-in
- Only one participant seriously considered switching stores (when a cross-store deal surfaced unprompted)

**Quotes:**
> *"I want my points at No Frills!"* — Novel user

> *"If it's cereal or spices, yeah, I'd try a deal. But for salmon or shrimp — no. I'm getting it from a place I feel comfortable."* — Novel user

**Design implication:** Any nudge toward new stores must address the trust gap, not just highlight price.

---

## Finding 02 — Search Is a Hidden Dependency
*Usability Finding*

Search is the dominant interaction path — and a single point of failure.

**Evidence:**
- Tasks 1 & 2: rated 1–2/5 difficulty — users moved fast, felt confident. Problems stayed hidden.
- Task 3 (search restricted): slower completion, verbal frustration, false negatives
- Every browsing weakness surfaced the moment search was unavailable
- One participant did not see a soup item that was visible on screen
- One participant assumed the items she could see were the only options available

**Quote:**
> *"I'm lost, because the quickest way for me to search that information… I need the search bar."* — Experienced user

**Design implication:** Category browsing needs to function as a real fallback, not a dead end.

---

## Finding 03 — Category Names Don't Match Mental Models
*Human-Centred + Usability Finding*

The platform's information architecture conflicts with how users think about food.

**Evidence:**
- Multiple participants looked for pasta under 'Bakery' first
- "Pantry" was perceived as a location (a cupboard), not a product type
- One participant expected a dedicated "Pasta" category — mirroring how supermarket aisles work
- One participant clicked "View More" expecting more milk options but was shown yogurt
- One participant discovered through trial and error that arrows cycle a subset while "View More" loads the full category — the UI did not communicate this

**Quote:**
> *"I don't even know what that would fall under."* — Novel user

**Design implication:** Category labels should map to product types (e.g., "Pasta & Grains") not storage locations.

---

## Finding 04 — Filters Failed Users
*Usability Finding*

Dietary and price filters were missing, hidden, or inconsistently implemented.

**Evidence:**
- 0 participants found a price filter during Task 3
- 3 participants gave up trying to use dietary filters
- Only 1 store had a gluten-free filter
- "Grain Free" vs "Gluten Free" inconsistency confused and eroded trust
- "Shop by Preference" was buried in the sidebar — no participant found it unprompted
- One participant found a gluten-free filter at Stop & Shop but not at BJ's

**Quote:**
> *"Not gonna lie, losing a little bit of hope."* — Novel user

> *"I've never heard it be referred to as grain-free before… I was like, grain-free, gluten-free, maybe they are the same thing. So I'll just click it and see."* — Participant

**Design implication:** Instacart should own the filter layer — standardized across all stores.

---

## Finding 05 — Product Cards Don't Surface What People Actually Need
*Usability Finding*

Most users never opened product detail pages — the card is the product page.

**Evidence:**
- Multiple participants made purchase decisions based on image, size, and badges only
- Multiple participants had to click each canned soup individually to check for low-sodium
- 2 participants actively sought nutritional information but couldn't find it
- One participant could not find a nutrition label for rice
- Missing from cards: dietary badges (halal, gluten-free, organic), nutritional highlights, certification info, quantity cues

**Quote:**
> *"Why don't they have a label for low sodium?"* — Experienced user

**Design implication:** Key dietary and nutritional signals must live on the card, not behind a click.

---

## Finding 06 — Budget Is Total Delivered Cost, Not Item Price
*Mental Model Finding*

Users evaluate budget as the final delivered cost. Item price alone is misleading.

**Evidence:**
- One participant questioned whether items were truly under budget after taxes, delivery fees, and tip
- One participant found cheaper oil at Food Bazar but paused — estimated delivery fees would cancel savings
- One participant could not see bag fees for Food Bazar
- One participant did not understand what "no markups" meant on store listings

**Design implication:** Show estimated total cost or a fee indicator alongside item prices during constrained shopping.

---

## Finding 07 — The Platform Does Not Support Specialty or Cultural Food Needs
*Human-Centred Finding*

For users with halal, cultural, or specialty requirements, the platform falls short in ways that go beyond inconvenience.

**Evidence:**
- One participant searched for Ghanaian butter bread across ShopRite, Aldi's, and Food Bazar — no results. Accepted Hawaiian rolls as substitute. Planned a separate in-person trip.
- One participant shops exclusively halal and could not find halal certification on products at Target
- One participant noted that "soup" in Ghanaian cooking refers to a thick stew — the platform's taxonomy reflects one cultural frame
- This produces "split shopping" behaviour: part of the list online, the rest in person

**Design implication:** Halal and kosher certification data, religious dietary filters, and cultural synonym support are not nice-to-haves — they are trust barriers blocking purchase.

---

## Finding 08 — Store Pages Feel Visually Overwhelming
*Usability Finding*

Dense store landing pages reduced browsing effectiveness and increased cognitive load.

**Evidence:**
- One participant described being "blasted with products" upon opening a store page
- Multiple users did not notice or use the left sidebar navigation
- One described the layout as "busy" and defaulted to search to avoid scrolling
- Random highlighted items were described as confusing and sidetracking

**Design implication:** Reduce product density on landing pages. Prioritize clear category entry points over product grids.

---

## Proposed Design Solutions

| Finding | Trap (from Traps & Tenets) | Proposed Fix |
|---|---|---|
| Category mismatch | Poor Grouping + Inviting Dead End | Rename to product-type labels: "Pasta & Grains", "Soups & Canned Goods" |
| Hidden filters | Effectively invisible element | Move dietary/preference filters to top of category pages |
| Missing product card info | Effectively Invisible Element + Unnecessary Step | Surface dietary badges, nutrition highlights on card |
| Price opacity | — | Show estimated delivery fee + total on search results |
| Cultural food gaps | — | Specialty store partnerships + "similar items" on zero results |

---

## Key Takeaway

> *"Every friction point we found has a face behind it. A shopper who gave up. A parent who felt deceived. A person whose dietary needs went unseen."*

---

*Raw data, session recordings, and thematic coding available on request.*  
*Participant names anonymised per IRB-aligned research ethics.*
