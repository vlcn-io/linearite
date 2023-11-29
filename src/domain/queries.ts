import { Query } from '@vlcn.io/react'
import { filterStateToWhere } from '../utils/filterState'
import { Schema as S } from './Schema'
import { DecodedFilterState, Issue, PriorityType, StatusType, String_of } from './SchemaType'

export const queries = {
  // Types are auto-generated via `typed-sql`
  // run `pnpm sql-watch` to generate types
  totalIssueCount: S.sql<{
    c: number
  }>`SELECT COUNT(*) AS c FROM issue`,

  filterState: S.sql<{
    id: 'singleton'
    orderBy: string
    orderDirection: string
    status: String_of<StatusType[]> | null
    priority: String_of<PriorityType[]> | null
    query: string | null
  }>`SELECT * FROM filter_state`,

  boardIssues: (filters: DecodedFilterState) => {
    return `SELECT * FROM issue ${filterStateToWhere(filters)} ORDER BY kanbanorder ASC` as Query<Issue>
  },
}
