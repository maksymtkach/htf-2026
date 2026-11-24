import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatWindow({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<Msg[]>([
        { role: 'assistant', content: 'Greetings, Guardian! How can I help?' },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    async function send() {
        const text = input.trim()
        if (!text || loading) return

        const next: Msg[] = [...messages, { role: 'user', content: text }]
        setMessages(next)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: next }),
            })
            const data = await res.json()
            setMessages([...next, { role: 'assistant', content: data.reply ?? 'Something went wrong.' }])
        } catch {
            setMessages([...next, { role: 'assistant', content: 'Could not reach the server.' }])
        } finally {
            setLoading(false)
        }
    }

    // Stays mounted when closed, so the conversation is kept
    return (
        <div
            className={`fixed bottom-5 left-24 z-50 flex h-[28rem] w-96 flex-col rounded-lg border border-line bg-white/90 text-fg shadow-2xl backdrop-blur ${open ? '' : 'hidden'}`}
        >
            <div className="flex items-center justify-between border-b border-line bg-subtle p-3">
                <span className="font-semibold">AI Assistant</span>
                <button type="button" onClick={onClose} aria-label="Close chat" className="cursor-pointer">
                    <X className="size-5" />
                </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                                m.role === 'user'
                                    ? 'bg-linear-to-br from-accent-from to-accent-to text-white'
                                    : 'bg-subtle'
                            }`}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && <div className="text-sm opacity-60">Thinking...</div>}
                <div ref={endRef} />
            </div>

            <div className="flex gap-2 border-t border-line p-3">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Ask something..."
                    className="flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none"
                />
                <button
                    type="button"
                    onClick={send}
                    disabled={loading}
                    aria-label="Send"
                    className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-linear-to-br from-accent-from to-accent-to text-white disabled:opacity-50"
                >
                    <Send className="size-4" />
                </button>
            </div>
        </div>
    )
}