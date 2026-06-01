import styles from './ProductGrid.module.css'

function isAIPick(product, dietary, query, aiMode) {
  if (!aiMode) return false
  if (dietary.includes('halal') && product.tags.includes('halal')) return true
  if (dietary.includes('vegan') && product.tags.includes('vegan') && product.price < 5) return true
  if (query && product.name.toLowerCase().includes(query.toLowerCase().split(' ')[0])) return true
  return false
}

export default function ProductGrid({ products, loading, cart, onAdd, onRemove, aiMode, dietary, query }) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🛒</div>
        <p>No products match your filters.</p>
        <p className={styles.emptyHint}>Try adjusting dietary tags or raising the price limit.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {products.map(p => {
        const qty = cart[p.id] || 0
        const aiPick = isAIPick(p, dietary, query, aiMode)
        return (
          <article key={p.id} className={`${styles.card} ${aiPick ? styles.aiCard : ''}`}>
            <div className={styles.imgWrap}>
              <span className={styles.emoji}>{p.emoji}</span>
              <div className={styles.tags}>
                {aiPick && <span className={`${styles.tag} ${styles.tagAi}`}>✦ AI pick</span>}
                {p.tags.map(t => (
                  <span key={t} className={`${styles.tag} ${styles['tag_' + t.replace('-', '_')]}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.store}>{p.store}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.bottom}>
                <span className={styles.price}>${p.price.toFixed(2)}</span>
                <div className={styles.qtyControl}>
                  {qty > 0 && (
                    <button className={styles.qtyBtn} onClick={() => onRemove(p.id)} aria-label="Remove one">−</button>
                  )}
                  {qty > 0 && <span className={styles.qty}>{qty}</span>}
                  <button
                    className={`${styles.addBtn} ${qty > 0 ? styles.added : ''}`}
                    onClick={() => onAdd(p)}
                    aria-label={`Add ${p.name} to cart`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
