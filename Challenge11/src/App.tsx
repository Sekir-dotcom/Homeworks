import { useMemo, useState } from 'react'
import './App.css'
import { Trie } from './utils/trie'
import type { Product } from './utils/trie'

const products: Product[] = [
  { name: 'air force', popularity: 95 },
  { name: 'air max', popularity: 90 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
  { name: 'nike downshifter', popularity: 72 },
  { name: 'air zoom', popularity: 88 },
  { name: 'classic leather', popularity: 65 },
  { name: 'ultra boost', popularity: 78 },
]

function App() {
  const [query, setQuery] = useState('')
  const [topKInput, setTopKInput] = useState('3')

  const trie = useMemo(() => {
    const engine = new Trie()
    products.forEach((product) => engine.insert(product.name, product.popularity))
    return engine
  }, [])

  const topK = useMemo(() => {
    const parsed = parseInt(topKInput, 10)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 3
  }, [topKInput])

  const results = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    return trie.searchTopK(query, topK)
  }, [query, topK, trie])

  const title = query.trim() ? `Resultados para “${query.trim()}”` : ''
  const subtitle = query.trim()
    ? `Mostrando ${results.length} resultado${results.length === 1 ? '' : 's'}`
    : ''

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Eco-Moda</p>
        <h1>Buscador de productos - EcoModa</h1>
      </section>

      <section className="search-panel">
        <div className="inputs-row">
          <label className="input-group">
            <span>Buscar producto</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Buscar producto"
            />
          </label>

          <label className="input-group">
            <span>Top K</span>
            <input
              type="number"
              min={1}
              max={10}
              value={topKInput}
              onChange={(event) => setTopKInput(event.target.value)}
              placeholder="3"
              aria-label="Número de resultados"
            />
          </label>
        </div>

        <div className="search-summary">
          <strong>{title}</strong>
          <p>{subtitle}</p>
        </div>
      </section>

      <section className="results-panel">
        {results.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron productos</p>
            <span>Intenta otra palabra o revisa el prefijo.</span>
          </div>
        ) : (
          <ul className="results-list">
            {results.map((product) => (
              <li key={product.name} className="result-item">
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.popularity} puntos de popularidad</p>
                </div>
                <div className="badge">Top</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
