import VerseCard from './VerseCard'

function MessageBubble({ role, content, verses }) {
  const isUser = role === 'user'

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'assistant-row'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
        <p>{content}</p>
      </div>

      {!isUser && Array.isArray(verses) && verses.length > 0 && (
        <div className="verse-list">
          {verses.map((verse, index) => (
            <VerseCard
              key={`${verse.surah_name}-${verse.ayah_number}-${index}`}
              verse={verse}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MessageBubble
