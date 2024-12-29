import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'backend'

export const api = edenTreaty<App>('http://localhost:3001')
