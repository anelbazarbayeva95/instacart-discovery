import { useState, useEffect } from 'react'
import styles from './BudgetBar.module.css'

export default function BudgetBar({ items, store, apiBase }) {
  const [budget, setBudget] = useState(null)

  useEffect(() => {
    if (!items.length) return
    fetchBudget()
  }, [items, store])

  async function fetchBudget() {
    try {
      const res = await fetch(`${apiBase}/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ price: i.price, quantity: i.quantity })),
          store,
        }),
      })
      setBudget(await res.json())
    } catch {
      // fallback: calculate locally
      const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0)
      const fee = subtotal > 35 ? 0 : 3.99
      setBudget({
        subtotal: subtotal.toFixed(2),
        delivery_fee: fee,
        estimated_tip: (subtotal * 0.1).toFixed(2),
        estimated_total: (subtotal + fee + subtotal * 0.1 + subtotal * 0.08875).toFixed(2),
        note: fee === 0 ? 'Delivery is free!' : `$${(35 - subtotal).toFixed(2)} more for free delivery`,
      })
    }
  }

  if (!budget) return null

  return (
    <div className={styles.bar} role="region" aria-label="Budget summary">
      <div className={styles.item}>
        <span className={styles.label}>Subtotal</span>
        <span className={styles.val}>${budget.subtotal}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Delivery</span>
        <span className={styles.val}>{budget.delivery_fee === 0 ? 'Free 🎉' : `$${budget.delivery_fee}`}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Est. tip</span>
        <span className={styles.val}>${budget.estimated_tip}</span>
      </div>
      <div className={`${styles.item} ${styles.total}`}>
        <span className={styles.label}>Est. total</span>
        <span className={styles.val}>${budget.estimated_total}</span>
      </div>
      <span className={styles.note}>{budget.note}</span>
    </div>
  )
}
