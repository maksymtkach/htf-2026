import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.ts'

// Server-only: never import this from client code.
const client = postgres(process.env.DATABASE_URL ?? 'postgres://guardians:guardians@localhost:5432/guardians')

export const db = drizzle(client, { schema })
