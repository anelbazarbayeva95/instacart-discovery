import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import BudgetBar from './components/BudgetBar.jsx'
import ChatBot from './components/ChatBot.jsx'
import styles from './App.module.css'

const API = import.meta.env.VITE_API_URL || '/api'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [dietary, setDietary] = useState([])
  const [store, setStore] = useState(null)
  const [maxPrice, setMaxPrice] = useState(15)
  const [cart, setCart] = useState({})
  const [chatOpen, setChatOpen] = useState(false)
  const [aiMode, setAiMode] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [query, dietary, store, maxPrice])

  async function fetchProducts() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      dietary.forEach(d => params.append('dietary', d))
      if (store) params.set('store', store)
      params.set('max_price', maxPrice)
      params.set('limit', 20)

      const res = await fetch(`${API}/products/search?${params}`)
      const data = await res.json()
      setProducts(data.results || [])
    } catch {
      // fallback — show nothing, not crash
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  function toggleDietary(tag) {
    setDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function addToCart(product) {
    setCart(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))
  }

  function removeFromCart(id) {
    setCart(prev => {
      const next = { ...prev }
      if (next[id] > 1) next[id] -= 1
      else delete next[id]
      return next
    })
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const p = products.find(x => x.id === parseInt(id))
    return p ? { ...p, quantity: qty } : null
  }).filter(Boolean)

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div className={styles.app}>
      <Header
        query={query}
        onQuery={setQuery}
        cartCount={cartCount}
        onCartClick={() => setChatOpen(true)}
      />

      <div className={styles.layout}>
        <Sidebar
          dietary={dietary}
          onDietary={toggleDietary}
          store={store}
          onStore={setStore}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
          aiMode={aiMode}
          onAiMode={setAiMode}
        />

        <main className={styles.main}>
          <ProductGrid
            products={products}
            loading={loading}
            cart={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
            aiMode={aiMode}
            dietary={dietary}
            query={query}
          />
        </main>
      </div>

      {cartItems.length > 0 && (
        <BudgetBar
          items={cartItems}
          store={store || 'ShopRite'}
          apiBase={API}
        />
      )}

      <button
        className={styles.chatFab}
        onClick={() => setChatOpen(o => !o)}
        aria-label="Open AI chat"
      >
        {chatOpen ? '✕' : '✦ Ask AI'}
      </button>

      {chatOpen && (
        <ChatBot
          onClose={() => setChatOpen(false)}
          apiBase={API}
          products={products}
        />
      )}
    </div>
  )
}
