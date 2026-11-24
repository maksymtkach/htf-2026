import { createFileRoute } from '@tanstack/react-router'
import Chat from '../AiChat/Chat.tsx'

export const Route = createFileRoute('/chat')({
    component: Chat,
})