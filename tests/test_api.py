"""
Test suite for search engine and budget estimator.
Run: pytest tests/ -v
"""
import pytest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from data.build_index import build_index
from api.search import SearchEngine
from api.budget import estimate_total

MODEL_PATH = Path(__file__).parent.parent / "models" / "tfidf_index.pkl"


@pytest.fixture(scope="session", autouse=True)
def build():
    build_index()


@pytest.fixture(scope="session")
def engine():
    return SearchEngine()


# ── Search tests ──────────────────────────────────────────────────────────────

def test_basic_query_returns_results(engine):
    results = engine.search("chicken")
    assert len(results) > 0


def test_halal_filter(engine):
    results = engine.search("", dietary_tags=["halal"])
    assert all("halal" in r["tags"] for r in results)


def test_vegan_filter(engine):
    results = engine.search("", dietary_tags=["vegan"])
    assert all("vegan" in r["tags"] for r in results)


def test_gluten_free_filter(engine):
    results = engine.search("pasta", dietary_tags=["gluten-free"])
    assert all("gluten-free" in r["tags"] for r in results)


def test_combined_halal_gluten_free(engine):
    results = engine.search("", dietary_tags=["halal", "gluten-free"])
    assert all("halal" in r["tags"] and "gluten-free" in r["tags"] for r in results)


def test_price_filter(engine):
    results = engine.search("", max_price=4.00)
    assert all(r["price"] <= 4.00 for r in results)


def test_store_filter(engine):
    results = engine.search("", store="Whole Foods")
    assert all(r["store"] == "Whole Foods" for r in results)


def test_west_african_query(engine):
    results = engine.search("west african soup")
    names = [r["name"].lower() for r in results]
    assert any("palm" in n or "lentil" in n or "soup" in n for n in names)


def test_no_results_impossible_filter(engine):
    results = engine.search("", dietary_tags=["halal"], store="Whole Foods", max_price=0.01)
    assert results == []


def test_similarity_scores_descending(engine):
    results = engine.search("chicken halal")
    scores = [r["similarity_score"] for r in results]
    assert scores == sorted(scores, reverse=True)


def test_empty_query_returns_all_within_filters(engine):
    results = engine.search("")
    assert len(results) == 10  # default top_k


def test_limit_respected(engine):
    results = engine.search("", top_k=3)
    assert len(results) <= 3


# ── Budget tests ──────────────────────────────────────────────────────────────

def test_budget_structure():
    result = estimate_total([{"price": 3.99, "quantity": 1}], "ShopRite")
    for key in ["subtotal", "delivery_fee", "estimated_tip", "estimated_tax", "estimated_total", "note"]:
        assert key in result


def test_budget_total_exceeds_subtotal():
    result = estimate_total([{"price": 5.00, "quantity": 2}], "Target")
    assert result["estimated_total"] > result["subtotal"]


def test_free_delivery_over_threshold():
    result = estimate_total([{"price": 12.00, "quantity": 3}], "ShopRite")
    assert result["delivery_fee"] == 0.0
    assert "free" in result["note"].lower()


def test_subtotal_math():
    result = estimate_total([{"price": 3.99, "quantity": 1}, {"price": 1.29, "quantity": 2}], "ShopRite")
    assert result["subtotal"] == round(3.99 + 1.29 * 2, 2)
