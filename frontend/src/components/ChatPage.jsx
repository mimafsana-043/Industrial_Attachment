import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

const CHAT_URL = 'http://127.0.0.1:8000/chat'

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Assalamu alaikum! Ask me any question, and I will provide Quran-based guidance.',
      verses: [],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const chatFeedRef = useRef(null)

  useEffect(() => {
    if (!chatFeedRef.current) return
    chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight
  }, [messages, isLoading])

  const sendMessage = async (question) => {
    setError('')
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: question,
      },
    ])

    setIsLoading(true)

    try {
      const response = await axios.post(CHAT_URL, { question })
      const data = response.data ?? {}

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.answer || 'I could not generate an answer right now.',
          verses: data.verses || [],
        },
      ])
    } catch {
      setError('Failed to reach AI assistant. Ensure backend is running at http://127.0.0.1:8000.')
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'I could not connect to the backend service. Please try again shortly.',
          verses: [],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="chat-page">
      <section className="chat-shell">
        <header className="chat-header">
          <h1>Quran AI Assistant</h1>
          <p>Ask faith-based questions and explore referenced Quran verses.</p>
        </header>

        <div className="chat-feed" ref={chatFeedRef}>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
              verses={message.verses}
            />
          ))}

          {isLoading && (
            <div className="message-row assistant-row">
              <div className="message-bubble assistant-bubble typing-indicator" aria-live="polite">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        {error && <p className="chat-error">{error}</p>}

        <footer className="chat-footer">
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </footer>
      </section>
    </main>
  )
}

export default ChatPage
