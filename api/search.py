"""
Semantic product search using TF-IDF cosine similarity.
"""
import pickle
import numpy as np
from pathlib import Path
from sklearn.metrics.pairwise import cosine_similarity

MODEL_PATH = Path(__file__).parent.parent / "models" / "tfidf_index.pkl"
_engine = None


def get_engine():
    global _engine
    if _engine is None:
        _engine = SearchEngine()
    return _engine


class SearchEngine:
    def __init__(self):
        with open(MODEL_PATH, "rb") as f:
            data = pickle.load(f)
        self.vectorizer = data["vectorizer"]
        self.matrix = data["matrix"]
        self.products = data["products"]

    def search(
        self,
        query: str,
        dietary_tags: list[str] | None = None,
        store: str | None = None,
        max_price: float | None = None,
        top_k: int = 10,
    ) -> list[dict]:
        # Filter candidates
        candidates = self.products
        if dietary_tags:
            candidates = [p for p in candidates if all(t in p["tags"] for t in dietary_tags)]
        if store:
            candidates = [p for p in candidates if p["store"].lower() == store.lower()]
        if max_price is not None:
            candidates = [p for p in candidates if p["price"] <= max_price]

        if not candidates:
            return []

        candidate_indices = [self.products.index(p) for p in candidates]
        candidate_matrix = self.matrix[candidate_indices]

        if query.strip():
            q_vec = self.vectorizer.transform([query])
            scores = cosine_similarity(q_vec, candidate_matrix).flatten()
            ranked = sorted(
                zip(candidates, scores), key=lambda x: x[1], reverse=True
            )
            results = [
                {**p, "similarity_score": round(float(s), 4)}
                for p, s in ranked[:top_k]
            ]
        else:
            results = [{**p, "similarity_score": 1.0} for p in candidates[:top_k]]

        return results
