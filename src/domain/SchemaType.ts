export type Issue = SchemaType['issue']
export type Description = SchemaType['description']
export type Comment = SchemaType['comment']
export type FilterState = SchemaType['filter_state']

// === custom code above this line ===
export type SchemaType = {
  readonly issue: Readonly<{
    id: string
    title: string | null
    creator: string | null
    priority: 'none' | 'urgent' | 'high' | 'low' | 'medium'
    status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
    created: number
    modified: number
    kanbanorder: string
  }>
  readonly description: Readonly<{
    id: string
    body: string
  }>
  readonly comment: Readonly<{
    id: string
    body: string
    creator: string
    issueId: string
    created: number
    author: string
  }>
  readonly filter_state: Readonly<{
    id: number
    orderBy: string
    orderDirection: string
    status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | null
    priority: 'none' | 'urgent' | 'high' | 'low' | 'medium' | null
    query: string | null
  }>
}
