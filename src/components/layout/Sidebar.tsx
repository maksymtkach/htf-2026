import { Link } from '@tanstack/react-router'
import { Shield, WandSparkles, LayoutGrid, User, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { useGuardian, GuardianProvider,type Role } from '#/roles/Guardian.tsx'

export function UserButton() {
    const [open, setOpen] = useState(false)
    const [windowOpen, setWindowOpen] = useState(false)
    const [minimized, setMinimized] = useState(false)
    const { guardian, setRole } = useGuardian()

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
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-fg hover:bg-subtle"
            >
                <User className="size-5" strokeWidth={1.75} />
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
    /** Only set for pages that already have a route. */
    to?: '/'
}

const navItems: NavItem[] = [
    { label: 'Overview', icon: LayoutGrid, to: '/' },
]

// Icon-only items: the label lives in aria-label/title for screen readers and hover.
const itemClass =
    'flex size-12 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white'
const activeClass = 'bg-white/10 text-white'

export function Sidebar() {
    const { guardian } = useGuardian()
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
                        <button key={label} type="button" aria-label={label} title={label} className={itemClass}>
                            {icon}
                        </button>
                    )
                })}
            </nav>

            <div className="flex w-full flex-col items-center gap-4">
                <UserButton />
            </div>
        </aside>
    )
}