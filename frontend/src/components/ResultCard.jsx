function ResultCard({ result }) {
  return (
    <article className="result-card">
      <header className="result-card-header">
        <h3 className="surah-title">{result.surah_name}</h3>
        <span className="similarity-badge">{(result.similarity_score * 100).toFixed(1)}% match</span>
      </header>
      <p className="verse-meta">Ayah {result.ayah_number}</p>
      <p className="verse-text">{result.arabic_text}</p>
      <p className="verse-translation">{result.english_translation}</p>
    </article>
  )
}

export default ResultCard
