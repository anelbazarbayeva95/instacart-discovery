import { useState, useRef, useEffect } from 'react'
import styles from './ChatBot.module.css'

const SYSTEM_PROMPT = (catalog) => `You are a friendly grocery shopping AI assistant embedded in "Grocery Discovery" — a portfolio project by Anel Bazarbayeva, a software engineer and UX researcher at Pace University.

Your product catalog:
${JSON.stringify(catalog.map(p => ({ name: p.name, store: p.store, price: '$' + p.price, tags: p.tags })))}

Your personality: warm, concise, helpful. Specialise in dietary needs (halal, vegan, gluten-free), meal planning, and budget transparency.

When recommending products, mention the store and price. Keep responses to 2-4 sentences unless asked for a recipe or meal plan.

When you suggest specific products, append this JSON block at the END of your message (no other location):
PRODUCTS: [{"name":"Product Name","price":0.00,"emoji":"🍗","store":"StoreName"}]

Only include PRODUCTS if you're recommending specific items. Always end the PRODUCTS block on its own line.`

const QUICK_REPLIES = [
  'Halal meals under $10',
  'Vegan protein options',
  'What can I cook with rice and chicken?',
  'Cheapest gluten-free items',
]

export default function ChatBot({ onClose, apiBase, products }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your AI grocery assistant. I can help you find halal, vegan, or gluten-free products, plan meals, and estimate costs. What are you shopping for?",
      products: null,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send(text) {
    const userText = text || input.trim()
    if (!userText || loading) return
    setInput('')
    setShowQuick(false)

    const newHistory = [...history, { role: 'user', content: userText }]
    setHistory(newHistory)
    setMessages(prev => [...prev, { role: 'user', text: userText, products: null }])
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT(products),
          messages: newHistory,
        }),
      })
      const data = await res.json()

      if (data.error) throw new Error(data.error.message)

      const raw = data.content[0].text
      let replyText = raw
      let replyProducts = null

      const match = raw.match(/PRODUCTS:\s*(\[[\s\S]*?\])/m)
      if (match) {
        try { replyProducts = JSON.parse(match[1]) } catch {}
        replyText = raw.replace(/PRODUCTS:[\s\S]*$/m, '').trim()
      }

      setHistory(prev => [...prev, { role: 'assistant', content: raw }])
      setMessages(prev => [...prev, { role: 'assistant', text: replyText, products: replyProducts }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `Sorry, I couldn't connect right now. Error: ${err.message}`,
        products: null,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.panel} role="dialog" aria-label="AI grocery assistant">
      <div className={styles.head}>
        <div className={styles.avatar} aria-hidden="true">🤖</div>
        <div>
          <div className={styles.name}>Grocery AI</div>
          <div className={styles.sub}>Powered by Claude · {products.length} products</div>
        </div>
        <span className={styles.online} title="Online" />
        <button className={styles.close} onClick={onClose} aria-label="Close chat">✕</button>
      </div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.bot}`}>
            <div className={styles.bubble}>{m.text}</div>
            {m.products?.map((p, j) => (
              <div key={j} className={styles.productCard}>
                <span className={styles.pEmoji}>{p.emoji || '🛒'}</span>
                <div className={styles.pInfo}>
                  <div className={styles.pName}>{p.name}</div>
                  <div className={styles.pStore}>{p.store}</div>
                </div>
                <span className={styles.pPrice}>${p.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))}
        {loading && (
          <div className={`${styles.msg} ${styles.bot}`}>
            <div className={styles.typing}>
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showQuick && (
        <div className={styles.quickReplies}>
          {QUICK_REPLIES.map(q => (
            <button key={q} className={styles.qr} onClick={() => send(q)}>{q}</button>
          ))}
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about products, meals, budget…"
          disabled={loading}
          aria-label="Chat message"
        />
        <button
          className={styles.sendBtn}
          onClick={() => send()}
          disabled={loading || !input.trim()}
          aria-label="Send"
        >
          ↑
        </button>
      </div>
    </div>
  )
}
