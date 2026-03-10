import { useState } from 'react'

function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const question = text.trim()
    if (!question || isLoading) return

    onSend(question)
    setText('')
  }

  return (
    <form className="chat-input-wrapper" onSubmit={handleSubmit}>
      <input
        className="chat-input"
        type="text"
        placeholder="Ask about Quran guidance..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={isLoading}
      />
      <button className="send-button" type="submit" disabled={isLoading || !text.trim()}>
        Send
      </button>
    </form>
  )
}

export default ChatInput
