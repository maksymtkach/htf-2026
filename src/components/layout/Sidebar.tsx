import { Link } from '@tanstack/react-router'
import { Shield, WandSparkles, Swords, LayoutGrid,MessageCircle, type LucideIcon } from 'lucide-react'
import ChatWindow from '../../AiChat/ChatWindow.tsx' // adjust the path to where the file is
import { useState } from 'react'
import { useGuardian, type Role } from '#/roles/Guardian.tsx'


export function UserButton() {
    const [open, setOpen] = useState(false)
    const [windowOpen, setWindowOpen] = useState(false)
    const [minimized, setMinimized] = useState(false)
    const { guardian, setRole } = useGuardian()
    const RoleIcon = guardian.role === 'Commander' ? WandSparkles : Swords

    const handleSelect = (r: Role) => {
        setRole(r)
        setOpen(false)
        setWindowOpen(true)
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="User menu"
                title={`${guardian.role} menu`}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border-2 border-accent-from bg-linear-to-br from-accent-from to-accent-to text-white shadow-lg transition-transform hover:scale-110"
                style={{ boxShadow: 'var(--role-glow)' }}
            >
                <RoleIcon className="size-6" strokeWidth={2} />
            </button>

            {open && (
                <div className="absolute bottom-0 left-full ml-3 w-64 rounded-xl border border-line bg-white/90 p-4 text-fg shadow-lg backdrop-blur">
                    {(['Defender', 'Commander'] as Role[]).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => handleSelect(r)}
                            className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left hover:bg-subtle"
                        >
                            {r}
                        </button>
                    ))}
                </div>
            )}

            {windowOpen && (
                <div className="fixed bottom-5 right-5 z-50 w-96 rounded-lg border border-line bg-white/90 text-fg shadow-2xl backdrop-blur">
                    <div className="flex justify-between border-b border-line bg-subtle p-3">
                        <span className="font-semibold">{guardian.role}</span>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setMinimized(!minimized)}>−</button>
                            <button type="button" onClick={() => setWindowOpen(false)}>×</button>
                        </div>
                    </div>
                    {!minimized && (
                        <div className="min-h-48 p-5">
                            <h2 className="text-lg font-bold">{guardian.role}</h2>
                            <p className="mt-2 opacity-70">Your {guardian.role} window content goes here.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

type NavItem = {
    label: string
    icon: LucideIcon
    to?: '/'
}

const navItems: NavItem[] = [
    { label: 'Overview', icon: LayoutGrid, to: '/' },
]

const itemClass =
    'flex size-12 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white'
const activeClass = 'bg-white/10 text-white'

export function Sidebar() {
    const { guardian } = useGuardian()
    const [chatOpen, setChatOpen] = useState(false)
    const LogoIcon = guardian.role === 'Commander' ? WandSparkles : Shield

    return (
        <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col items-center bg-sidebar py-5">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-accent-from to-accent-to text-white shadow-md shadow-black/30">
                <LogoIcon className="size-7" strokeWidth={2} />
            </div>

            <nav className="flex w-full flex-1 flex-col items-center gap-1">
                {navItems.map(({ label, icon: Icon, to }) => {
                    const icon = <Icon className="size-6" strokeWidth={1.5} />

                    return to ? (
                        <Link
                            key={label}
                            to={to}
                            aria-label={label}
                            title={label}
                            className={itemClass}
                            activeOptions={{ exact: true }}
                            activeProps={{ className: activeClass }}
                        >
                            {icon}
                        </Link>
                    ) : (
                        <button
                            key={label}
                            type="button"
                            aria-label={label}
                            title={label}
                            className={itemClass}
                        >
                            {icon}
                        </button>
                    )
                })}

                <button
                    type="button"
                    aria-label="AI chat"
                    title="AI chat"
                    onClick={() => setChatOpen((o) => !o)}
                    className={`${itemClass} ${chatOpen ? activeClass : ''}`}
                >
                    <MessageCircle className="size-6" strokeWidth={1.5} />
                </button>
            </nav>

            <div className="flex w-full flex-col items-center gap-4">
                <UserButton />
            </div>

            <ChatWindow open={chatOpen} onClose={() => setChatOpen(false)} />
        </aside>
    )
}