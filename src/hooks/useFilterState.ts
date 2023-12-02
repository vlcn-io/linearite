import { useSearchParams } from 'react-router-dom'
import { Issue, PriorityType, StatusType } from '../domain/SchemaType'

export interface FilterState {
  orderBy: keyof Issue
  orderDirection: 'asc' | 'desc'
  status?: StatusType[]
  priority?: PriorityType[]
  query?: string
}

export function useFilterState(): [
  FilterState,
  (state: Partial<FilterState>) => void
] {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderBy = (searchParams.get('orderBy') ?? 'created') as keyof Issue
  const orderDirection =
    (searchParams.get('orderDirection') as 'asc' | 'desc') ?? 'desc'
  const status = searchParams
    .getAll('status')
    .map((status) => status.toLocaleLowerCase().split(','))
    .flat()
  const priority = searchParams
    .getAll('priority')
    .map((priority) => priority.toLocaleLowerCase().split(','))
    .flat()
  const query = searchParams.get('query')

  const state = {
    orderBy,
    orderDirection,
    status: status as StatusType[],
    priority: priority as PriorityType[],
    query: query || undefined,
  }

  const setState = (state: Partial<FilterState>) => {
    const { orderBy, orderDirection, status, priority, query } = state
    setSearchParams((searchParams) => {
      if (orderBy) {
        searchParams.set('orderBy', orderBy)
      } else {
        searchParams.delete('orderBy')
      }
      if (orderDirection) {
        searchParams.set('orderDirection', orderDirection)
      } else {
        searchParams.delete('orderDirection')
      }
      if (status && status.length > 0) {
        searchParams.set('status', status.join(','))
      } else {
        searchParams.delete('status')
      }
      if (priority && priority.length > 0) {
        searchParams.set('priority', priority.join(','))
      } else {
        searchParams.delete('priority')
      }
      if (query) {
        searchParams.set('query', query)
      } else {
        searchParams.delete('query')
      }
      return searchParams
    })
  }

  return [state, setState]
}


export function filterStateToWhere(filterState: FilterState, cursor: Issue | null) {
  const { status, priority, query } = filterState
  let where = 'WHERE '
  const orig = where
  if (status && status.length > 0) {
    where += `STATUS IN (${status.map((s) => "'" + s + "'").join(',')})`
  }
  if (priority && priority.length > 0) {
    if (where !== orig) {
      where += ' AND '
    }
    where += `PRIORITY IN (${priority.map((s) => "'" + s + "'").join(',')})`
  }
  if (query) {
    // TODO: description search too?
    // TODO: FTS5
    if (where !== orig) {
      where += ' OR '
    }
    where += `TITLE LIKE '%${query}%'`
  }

  // Now check the order-by
  // and the cursor.
  // Add a constraint such that we will fetch what is after the cursor
  // if we have a cursor.
  if (cursor) {
    if (where !== orig) {
      where += ' AND '
    }
    where += `("${filterState.orderBy}" > ${cursor[filterState.orderBy]}
      OR (
        ${filterState.orderBy} = ${cursor[filterState.orderBy]} AND
        id > ${cursor.id}
      )
    )`
  }

  if (where === orig) {
    return ''
  }

  return where
}

export function filterStateToOrder(filterState: FilterState) {
  if (filterState.orderBy) {
    return `ORDER BY ${filterState.orderBy} ${filterState.orderDirection}`
  }

  return ''
}
