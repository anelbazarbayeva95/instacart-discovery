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
  const [cartOpen, setCartOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [aiMode, setAiMode] = useState(false)
  const [cartProducts, setCartProducts] = useState({})

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
    const key = String(product.id)
    setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
    setCartProducts(prev => ({ ...prev, [key]: product }))
  }

  function removeFromCart(id) {
    const key = String(id)
    setCart(prev => {
      const next = { ...prev }
      if (next[key] > 1) next[key] -= 1
      else delete next[key]
      return next
    })
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const p = cartProducts[id]
    return p ? { ...p, quantity: qty } : null
  }).filter(Boolean)

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  return (
    <div className={styles.app}>
      <Header
        query={query}
        onQuery={setQuery}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(o => !o)}
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

      {/* Cart Panel */}
      {cartOpen && (
        <div style={{
          position:'fixed',top:0,right:0,width:380,height:'100vh',
          background:'#fff',borderLeft:'1px solid #E6E8EB',
          zIndex:300,display:'flex',flexDirection:'column',
          boxShadow:'-8px 0 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            padding:'20px 24px',borderBottom:'1px solid #E6E8EB',
            display:'flex',justifyContent:'space-between',alignItems:'center'
          }}>
            <span style={{fontSize:18,fontWeight:700,fontFamily:'DM Sans,sans-serif'}}>
              Your cart ({cartCount})
            </span>
            <button
              onClick={() => setCartOpen(false)}
              style={{fontSize:20,background:'none',border:'none',cursor:'pointer',color:'#8F939B'}}
            >✕</button>
          </div>

          <div style={{flex:1,overflowY:'auto',padding:'16px 24px'}}>
            {cartItems.length === 0 ? (
              <p style={{color:'#8F939B',textAlign:'center',marginTop:40,fontFamily:'DM Sans,sans-serif'}}>
                Your cart is empty
              </p>
            ) : cartItems.map(item => (
              <div key={item.id} style={{
                display:'flex',alignItems:'center',gap:12,
                padding:'12px 0',borderBottom:'1px solid #E6E8EB'
              }}>
                <span style={{fontSize:32}}>{item.emoji || '🛒'}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:14,fontFamily:'DM Sans,sans-serif'}}>
                    {item.name}
                  </div>
                  <div style={{fontSize:12,color:'#8F939B',fontFamily:'DM Sans,sans-serif'}}>
                    {item.store}
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      width:24,height:24,borderRadius:'50%',
                      border:'1px solid #E6E8EB',background:'#fff',
                      cursor:'pointer',fontSize:16
                    }}
                  >−</button>
                  <span style={{fontWeight:600,fontSize:14,minWidth:16,textAlign:'center'}}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width:24,height:24,borderRadius:'50%',
                      background:'#108910',border:'none',
                      color:'#fff',cursor:'pointer',fontSize:16
                    }}
                  >+</button>
                </div>
                <span style={{
                  fontWeight:700,color:'#108910',fontSize:14,
                  minWidth:52,textAlign:'right'
                }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div style={{borderTop:'1px solid #E6E8EB'}}>
              <BudgetBar items={cartItems} store={store || 'ShopRite'} apiBase={API} />
            </div>
          )}
        </div>
      )}

      {/* Budget bar — only when cart panel is closed */}
      {cartItems.length > 0 && !cartOpen && (
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
          onAdd={addToCart}
        />
      )}
    </div>
  )
}