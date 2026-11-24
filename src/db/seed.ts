import { db } from './index.ts'
import { guardians, glitches, echoes } from './schema.ts'

const guardianRows: (typeof guardians.$inferInsert)[] = [
  { guardianId: 'GRD-001', codename: 'Zephyr', role: 'commander', passwordHash: 'changeme' },
  { guardianId: 'GRD-002', codename: 'Nova', role: 'defender', passwordHash: 'changeme' },
  { guardianId: 'GRD-003', codename: 'Flux', role: 'defender', passwordHash: 'changeme' },
]

const glitchRows: (typeof glitches.$inferInsert)[] = [
  { glitchId: 'GL-0142', status: 'LEAKED', description: 'Time loop detected near the eastern clock tower', timestamp: '2026-11-10T13:42:00Z', assignedToId: null },
  { glitchId: 'GL-0141', status: 'ASSESSING', description: 'Magic reserves dropping faster than expected', timestamp: '2026-11-10T11:05:00Z', assignedToId: 'GRD-002' },
  { glitchId: 'GL-0139', status: 'CONTAINING', description: 'Portal flicker in the archive vaults', timestamp: '2026-11-09T22:17:00Z', assignedToId: 'GRD-003' },
  { glitchId: 'GL-0137', status: 'FIXED', description: 'Echo sensors reporting duplicate signals', timestamp: '2026-11-08T08:30:00Z', assignedToId: 'GRD-002' },
]

const echoRows: (typeof echoes.$inferInsert)[] = [
  { echoId: 'ECH-001', glitchId: 'GL-0142', reportingGuardianId: 'GRD-002', description: 'Confirmed time distortion in sector 7', timestamp: '2026-11-10T14:00:00Z' },
  { echoId: 'ECH-002', glitchId: 'GL-0141', reportingGuardianId: 'GRD-002', description: 'Reserves at 62%, rate of loss accelerating', timestamp: '2026-11-10T11:30:00Z' },
  { echoId: 'ECH-003', glitchId: 'GL-0141', reportingGuardianId: 'GRD-003', description: 'Traced the drain to node cluster B-9', timestamp: '2026-11-10T12:10:00Z' },
  { echoId: 'ECH-004', glitchId: 'GL-0139', reportingGuardianId: 'GRD-003', description: 'Portal stabilized at 80%, monitoring', timestamp: '2026-11-09T23:00:00Z' },
  { echoId: 'ECH-005', glitchId: 'GL-0137', reportingGuardianId: 'GRD-002', description: 'Sensor firmware patched, signals nominal', timestamp: '2026-11-08T10:00:00Z' },
]

// Wipe and refill so the seed can be re-run safely.
await db.transaction(async (tx) => {
  await tx.delete(echoes)
  await tx.delete(glitches)
  await tx.delete(guardians)
  await tx.insert(guardians).values(guardianRows)
  await tx.insert(glitches).values(glitchRows)
  await tx.insert(echoes).values(echoRows)
})

console.log(`Seeded ${guardianRows.length} guardians, ${glitchRows.length} glitches, ${echoRows.length} echoes.`)
