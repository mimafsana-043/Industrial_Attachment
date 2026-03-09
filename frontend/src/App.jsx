import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ResultCard from './components/ResultCard'

const API_URL = 'http://127.0.0.1:8000/search'

function App() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (query) => {
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post(API_URL, { query })
      setResults(response.data.slice(0, 5))
    } catch {
      setError('Unable to fetch verses. Make sure the backend is running on http://127.0.0.1:8000.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="search-panel">
        <h1>Quran Semantic Search</h1>
        <p className="subtitle">Find relevant verses through meaning, not just exact keywords.</p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </section>

      {isLoading && (
        <div className="loading-wrapper" role="status" aria-live="polite">
          <div className="spinner" />
          <p>Searching verses...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <section className="results-grid">
        {results.map((result, index) => (
          <ResultCard key={`${result.surah_name}-${result.ayah_number}-${index}`} result={result} />
        ))}
      </section>
    </main>
  )
}

export default App
