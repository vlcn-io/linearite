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
  status: StatusType[] | null
  priority: PriorityType[] | null
}

export function decodeFilterState(filterState?: FilterState) {
  if (!filterState) {
    filterState = {
      id: 'singleton',
      orderBy: 'created',
      orderDirection: 'asc',
      status: null,
      priority: null,
      query: null,
    }
  }
  return {
    ...filterState,
    status: filterState.status ? filterState.status.split(',') : null,
    priority: filterState.priority ? filterState.priority.split(',') : null,
  } as DecodedFilterState
}

export function encodeFilterState(filterState: DecodedFilterState) {
  return {
    ...filterState,
    id: 'singleton',
    status: filterState?.status == null ? null : filterState.status.join(','),
    priority: filterState?.priority == null ? null : filterState.priority.join(','),
  } as FilterState
}

// === custom code above this line ===
export type SchemaType = {
  readonly issue: Readonly<{
    id: ID_of<Issue>
    title: string
    creator: string
    priority: 'none' | 'urgent' | 'high' | 'low' | 'medium'
    status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
    created: number
    modified: number
    kanbanorder: any
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
