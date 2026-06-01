import styles from './Sidebar.module.css'

const DIETARY = ['halal', 'vegan', 'gluten-free']
const STORES = ['ShopRite', 'Whole Foods', 'Food Bazar', 'Target']
const STORE_COLORS = {
  ShopRite: '#E53935',
  'Whole Foods': '#2E7D32',
  'Food Bazar': '#1565C0',
  Target: '#CC0000',
}

export default function Sidebar({ dietary, onDietary, store, onStore, maxPrice, onMaxPrice, aiMode, onAiMode }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.group}>
        <h3 className={styles.label}>Dietary</h3>
        <div className={styles.pills}>
          {DIETARY.map(d => (
            <button
              key={d}
              className={`${styles.pill} ${dietary.includes(d) ? styles.active : ''}`}
              onClick={() => onDietary(d)}
            >
              {dietary.includes(d) && '✓ '}
              <span style={{ textTransform: 'capitalize' }}>{d}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.group}>
        <h3 className={styles.label}>Price up to</h3>
        <div className={styles.priceRow}>
          <input
            type="range"
            min={1}
            max={15}
            step={0.5}
            value={maxPrice}
            onChange={e => onMaxPrice(parseFloat(e.target.value))}
            style={{ accentColor: 'var(--g)', flex: 1 }}
          />
          <span className={styles.priceVal}>${maxPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.group}>
        <h3 className={styles.label}>Store</h3>
        {STORES.map(s => (
          <button
            key={s}
            className={`${styles.storeItem} ${store === s ? styles.storeActive : ''}`}
            onClick={() => onStore(store === s ? null : s)}
          >
            <span className={styles.storeDot} style={{ background: STORE_COLORS[s] }} />
            {s}
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.group}>
        <button
          className={`${styles.aiToggle} ${aiMode ? styles.aiOn : ''}`}
          onClick={() => onAiMode(!aiMode)}
        >
          <span className={styles.aiDot} />
          AI picks {aiMode ? 'on' : 'off'}
        </button>
        <p className={styles.about}>
          A UX research prototype by <strong>Anel Bazarbayeva</strong>.
          Built on an 8-participant usability study of Instacart.
        </p>
      </div>
    </aside>
  )
}
