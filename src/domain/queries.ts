import { Schema as S } from './Schema'
import { PriorityType, StatusType, String_of } from './SchemaType'

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
}
