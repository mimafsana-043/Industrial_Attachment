function VerseCard({ verse }) {
  return (
    <article className="verse-card">
      <header className="verse-card-header">
        <strong>{verse.surah_name}</strong>
        <span>Ayah {verse.ayah_number}</span>
      </header>
      <p className="verse-arabic">{verse.arabic_text}</p>
      <p className="verse-translation">{verse.english_translation}</p>
    </article>
  )
}

export default VerseCard
