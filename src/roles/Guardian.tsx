import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Role = 'Defender' | 'Commander'

export type Guardian = {
    guardianId: string
    codename: string
    role: Role
}

// What each role may do. A Commander gets everything a Defender can, plus admin rights.
const defenderPermissions = {
    canReportEcho: true,
    canAssignGlitch: false,
    canChangeStatus: false,
    canDeleteEcho: false,
    canManageGuardians: false,
}

export const permissions: Record<Role, typeof defenderPermissions> = {
    Defender: defenderPermissions,
    Commander: {
        ...defenderPermissions,
        canAssignGlitch: true,
        canChangeStatus: true,
        canDeleteEcho: true,
        canManageGuardians: true,
    },
}

const defaultGuardian: Guardian = {
    guardianId: 'guardian-1',
    codename: 'Guardian',
    role: 'Defender',
}

type GuardianContextValue = {
    guardian: Guardian
    setRole: (role: Role) => void
    can: (typeof permissions)[Role]
}

const GuardianContext = createContext<GuardianContextValue | null>(null)

export function GuardianProvider({ children }: { children: ReactNode }) {
    const [guardian, setGuardian] = useState<Guardian>(defaultGuardian)

    // Load the saved role after mount (the server has no localStorage)
    useEffect(() => {
        const saved = localStorage.getItem('role')
        if (saved === 'Defender' || saved === 'Commander') {
            setGuardian((g) => ({ ...g, role: saved }))
        }
    }, [])

    // Put the role on <html> so the CSS themes can react to it
    useEffect(() => {
        document.documentElement.dataset.role = guardian.role
    }, [guardian.role])

    const setRole = (role: Role) => {
        localStorage.setItem('role', role)
        setGuardian((g) => ({ ...g, role }))
    }

    return (
        <GuardianContext.Provider value={{ guardian, setRole, can: permissions[guardian.role] }}>
            {children}
        </GuardianContext.Provider>
    )
}

export function useGuardian() {
    const ctx = useContext(GuardianContext)
    if (!ctx) throw new Error('useGuardian must be used inside <GuardianProvider>')
    return ctx
}