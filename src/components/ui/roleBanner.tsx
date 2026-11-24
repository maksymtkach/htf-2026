import { useGuardian } from '#/roles/Guardian.tsx'

export function RoleBanner() {
    const { guardian } = useGuardian()
    const isCommander = guardian.role === 'Commander'

    return (
        <div
            className="relative h-44 overflow-hidden rounded-2xl border border-line shadow-xl"
            style={{
                background: isCommander
                    ? 'linear-gradient(180deg,#1b0638 0%,#4c1d95 60%,#a21caf 100%)'
                    : 'linear-gradient(180deg,#0a1f44 0%,#1d4ed8 60%,#7dd3fc 100%)',
            }}
        >
            <svg viewBox="0 0 800 176" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
                {isCommander ? (
                    <>
                        <circle cx="650" cy="50" r="28" fill="#fdf4ff" opacity="0.95" />
                        <circle cx="662" cy="44" r="26" fill="#4c1d95" opacity="0.55" />
                        <g fill="#fff">
                            <circle cx="80" cy="30" r="1.8" /><circle cx="200" cy="60" r="1.2" />
                            <circle cx="330" cy="25" r="2" /><circle cx="470" cy="55" r="1.4" />
                            <circle cx="560" cy="20" r="1.6" /><circle cx="740" cy="90" r="1.5" />
                        </g>
                        {/* tower */}
                        <path d="M120 176 V80 L140 40 L160 80 V176 Z" fill="#0f0420" />
                        <path d="M110 84 L140 20 L170 84 Z" fill="#1b0638" />
                        <rect x="136" y="100" width="8" height="14" rx="4" fill="#f0abfc" />
                        <path d="M0 176 V150 Q200 120 400 150 T800 140 V176 Z" fill="#0f0420" />
                    </>
                ) : (
                    <>
                        <circle cx="680" cy="48" r="26" fill="#fef9c3" opacity="0.9" />
                        {/* castle */}
                        <g fill="#071428">
                            <rect x="460" y="90" width="200" height="86" />
                            <rect x="450" y="60" width="40" height="116" />
                            <rect x="630" y="60" width="40" height="116" />
                            <path d="M450 60 h8 v-10 h8 v10 h8 v-10 h8 v10 h8 Z" />
                            <path d="M630 60 h8 v-10 h8 v10 h8 v-10 h8 v10 h8 Z" />
                            <rect x="540" y="40" width="40" height="136" />
                            <path d="M536 40 L560 8 L584 40 Z" />
                        </g>
                        <rect x="552" y="120" width="16" height="30" rx="8" fill="#7dd3fc" />
                        <path d="M560 8 V-2 L580 4 L560 10" fill="#38bdf8" />
                        <path d="M0 176 V140 Q250 110 500 150 T800 130 V176 Z" fill="#071428" />
                    </>
                )}
            </svg>

            <div className="relative z-10 flex h-full flex-col justify-center px-8 text-white drop-shadow-lg">
                <p className="text-sm uppercase tracking-[0.3em] opacity-80">
                    {isCommander ? 'Archmage of Achrona' : 'Knight of Achrona'}
                </p>
                <h2 className="text-4xl font-bold">
                    {isCommander ? 'Commander' : 'Defender'} {guardian.codename}
                </h2>
            </div>
        </div>
    )
}