import { useState } from 'react'

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed || isLoading) return
    onSearch(trimmed)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="e.g. patience during hardship"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className="search-button" disabled={isLoading || !query.trim()}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar
