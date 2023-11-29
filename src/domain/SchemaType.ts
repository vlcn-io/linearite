import { ID_of } from '@vlcn.io/id'

export type Issue = SchemaType['issue']
export type Description = SchemaType['description']
export type Comment = SchemaType['comment']
export type FilterState = SchemaType['filter_state']

// === custom code above this line ===
export type SchemaType = {
  readonly issue: Readonly<{
    id: ID_of<Issue>
    title: string | null
    creator: string | null
    priority: 'none' | 'urgent' | 'high' | 'low' | 'medium'
    status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
    created: number
    modified: number
    kanbanorder: string
  }>
  readonly description: Readonly<{
    id: ID_of<Description>
    body: string
  }>
  readonly comment: Readonly<{
    id: ID_of<Comment>
    body: string
    creator: string
    issueId: string
    created: number
    author: string
  }>
  readonly filter_state: Readonly<{
    id: 'singleton'
    orderBy: string
    orderDirection: string
    status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | null
    priority: 'none' | 'urgent' | 'high' | 'low' | 'medium' | null
    query: string | null
  }>
}
