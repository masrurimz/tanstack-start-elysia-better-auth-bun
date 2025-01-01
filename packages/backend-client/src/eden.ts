import { edenTreaty } from '@elysiajs/eden'
import type { App, Session } from 'backend'

export const api = edenTreaty<App>('http://localhost:3001')
export type { Session }
