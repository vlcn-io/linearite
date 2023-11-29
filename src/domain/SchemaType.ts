import { ID_of } from '@vlcn.io/id'

export type Issue = SchemaType['issue']
export type Description = SchemaType['description']
export type Comment = SchemaType['comment']
export type FilterState = SchemaType['filter_state']

namespace Symbols {
  export declare const brand: unique symbol
}

export type StatusType = 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
export type PriorityType = 'none' | 'urgent' | 'high' | 'low' | 'medium'

export type String_of<T> = string & { readonly [Symbols.brand]: T }
export type DecodedFilterState = Omit<FilterState, 'status' | 'priority'> & {
  status: StatusType[]
  priority: PriorityType[]
}

export function decodeFilterState(filterState: FilterState) {
    return {
      ...filterState,
      status: filterState.status ? JSON.parse(filterState.status) : [],
      priority: filterState.priority ? JSON.parse(filterState.priority) : [],
    } as DecodedFilterState
}

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
    id: ID_of<Issue>
    body: string
  }>
  readonly comment: Readonly<{
    id: ID_of<Comment>
    body: string
    creator: string
    issueId: ID_of<Issue>
    created: number
    author: string
  }>
  readonly filter_state: Readonly<{
    id: 'singleton'
    orderBy: string
    orderDirection: string
    status: String_of<StatusType[]> | null
    priority: String_of<PriorityType[]> | null
    query: string | null
  }>
}
