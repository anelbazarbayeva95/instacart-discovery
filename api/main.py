"""
AI-Assisted Grocery Discovery API
Author: Anel Bazarbayeva

Endpoints:
  GET  /health           — liveness check
  GET  /products/search  — semantic search + filter
  GET  /products         — full catalog
  POST /budget           — full cost estimate
"""
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from api.search import get_engine
from api.budget import estimate_total

app = FastAPI(
    title="Grocery Discovery API",
    description="Semantic product search with dietary filtering and budget transparency.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/products")
def list_products():
    engine = get_engine()
    return {"products": engine.products, "total": len(engine.products)}


@app.get("/products/search")
def search_products(
    q: str = Query(default="", description="Natural language search query"),
    dietary: list[str] = Query(default=[], description="Dietary tags: halal, vegan, gluten-free"),
    store: str = Query(default=None, description="Filter by store name"),
    max_price: float = Query(default=None, description="Maximum price per item"),
    limit: int = Query(default=10, ge=1, le=50),
):
    engine = get_engine()
    results = engine.search(
        query=q,
        dietary_tags=dietary if dietary else None,
        store=store,
        max_price=max_price,
        top_k=limit,
    )
    return {"results": results, "count": len(results), "query": q}


class BudgetItem(BaseModel):
    price: float
    quantity: int = 1


class BudgetRequest(BaseModel):
    items: list[BudgetItem]
    store: str = "ShopRite"


@app.post("/budget")
def estimate_budget(req: BudgetRequest):
    items = [{"price": i.price, "quantity": i.quantity} for i in req.items]
    return estimate_total(items, req.store)
