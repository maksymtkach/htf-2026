import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
// Relative import: drizzle-kit loads this file and doesn't resolve the `#/` alias.
import { GLITCH_STATUSES } from '../lib/glitch.ts'

export const GUARDIAN_ROLES = ['defender', 'commander'] as const
export type GuardianRole = (typeof GUARDIAN_ROLES)[number]

export const guardians = sqliteTable('guardians', {
  guardianId: text('guardian_id').primaryKey(),
  codename: text('codename').notNull().unique(),
  role: text('role', { enum: GUARDIAN_ROLES }).notNull(),
  passwordHash: text('password_hash').notNull(),
})

export const glitches = sqliteTable('glitches', {
  glitchId: text('glitch_id').primaryKey(),
  status: text('status', { enum: GLITCH_STATUSES }).notNull(),
  description: text('description').notNull(),
  /** ISO 8601, so lexical order is chronological order. */
  timestamp: text('timestamp').notNull(),
  assignedToId: text('assigned_to_id').references(() => guardians.guardianId),
})

export const echoes = sqliteTable('echoes', {
  echoId: text('echo_id').primaryKey(),
  glitchId: text('glitch_id').notNull().references(() => glitches.glitchId),
  reportingGuardianId: text('reporting_guardian_id').notNull().references(() => guardians.guardianId),
  description: text('description').notNull(),
  /** ISO 8601, so lexical order is chronological order. */
  timestamp: text('timestamp').notNull(),
})
