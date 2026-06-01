import styles from './Header.module.css'

export default function Header({ query, onQuery, cartCount, onCartClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoDot} aria-hidden="true" />
        <span>Grocery Discovery</span>
        <span className={styles.badge}>AI-powered</span>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">⌕</span>
        <input
          type="text"
          value={query}
          onChange={e => onQuery(e.target.value)}
          placeholder="Search products, stores, cuisines…"
          className={styles.input}
          aria-label="Search products"
        />
      </div>

      <button className={styles.cartBtn} onClick={onCartClick} aria-label={`Cart, ${cartCount} items`}>
        🛒 Cart
        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
      </button>
    </header>
  )
}
