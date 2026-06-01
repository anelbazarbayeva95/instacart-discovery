"""
Build TF-IDF search index from products.json.
Run once before starting the API: python data/build_index.py
"""
import json
import pickle
import os
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "data" / "products.json"
MODEL_DIR = ROOT / "models"
MODEL_DIR.mkdir(exist_ok=True)


def build_index():
    with open(DATA_FILE) as f:
        products = json.load(f)

    # Build a rich text representation for each product
    def product_text(p):
        tag_str = " ".join(p["tags"])
        return f"{p['name']} {p['category']} {p['store']} {tag_str} {p['description']}"

    corpus = [product_text(p) for p in products]

    vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=1, sublinear_tf=True)
    matrix = vectorizer.fit_transform(corpus)

    with open(MODEL_DIR / "tfidf_index.pkl", "wb") as f:
        pickle.dump({"vectorizer": vectorizer, "matrix": matrix, "products": products}, f)

    print(f"Index built: {len(products)} products, {matrix.shape[1]} features")
    return products


if __name__ == "__main__":
    build_index()
