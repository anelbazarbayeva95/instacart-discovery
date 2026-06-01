"""
Real cost estimation: subtotal + delivery + tip + tax.
Addresses research finding that users didn't trust item prices without full transparency.
"""

STORE_FEES = {
    "ShopRite": {"delivery_fee": 3.99, "free_threshold": 35.00, "tax_rate": 0.08875},
    "Whole Foods": {"delivery_fee": 3.99, "free_threshold": 35.00, "tax_rate": 0.08875},
    "Food Bazar": {"delivery_fee": 4.99, "free_threshold": 40.00, "tax_rate": 0.08875},
    "Target": {"delivery_fee": 2.99, "free_threshold": 35.00, "tax_rate": 0.08875},
}
DEFAULT_FEE = {"delivery_fee": 3.99, "free_threshold": 35.00, "tax_rate": 0.08875}
DEFAULT_TIP_RATE = 0.10


def estimate_total(items: list[dict], store: str) -> dict:
    """
    items: [{"price": float, "quantity": int}, ...]
    store: store name string
    """
    fees = STORE_FEES.get(store, DEFAULT_FEE)

    subtotal = round(sum(i["price"] * i.get("quantity", 1) for i in items), 2)
    delivery_fee = 0.0 if subtotal >= fees["free_threshold"] else fees["delivery_fee"]
    estimated_tip = round(subtotal * DEFAULT_TIP_RATE, 2)
    estimated_tax = round(subtotal * fees["tax_rate"], 2)
    estimated_total = round(subtotal + delivery_fee + estimated_tip + estimated_tax, 2)

    return {
        "subtotal": subtotal,
        "delivery_fee": delivery_fee,
        "estimated_tip": estimated_tip,
        "estimated_tax": estimated_tax,
        "estimated_total": estimated_total,
        "free_delivery_threshold": fees["free_threshold"],
        "note": (
            "Delivery is free on this order!"
            if delivery_fee == 0
            else f"Add ${round(fees['free_threshold'] - subtotal, 2):.2f} more for free delivery"
        ),
    }
