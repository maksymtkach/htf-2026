import { useState } from 'react'

export default function Chat() {
    const [input, setInput] = useState('')
    const [reply, setReply] = useState('')
    const [loading, setLoading] = useState(false)

    async function send() {
        setLoading(true)
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        })
        const data = await res.json()
        setReply(data.reply)
        setLoading(false)
    }

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={send} disabled={loading}>Send</button>
            <p>{loading ? '...' : reply}</p>
        </div>
    )
}