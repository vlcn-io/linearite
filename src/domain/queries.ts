import { Query } from '@vlcn.io/react'
import { Schema as S } from './Schema'
import { Issue } from './SchemaType'
import { ID_of } from '@vlcn.io/id'
import { FilterState, filterStateToOrder, filterStateToWhere } from '../hooks/useFilterState'

export const queries = {
  // Types are auto-generated via `typed-sql`
  // run `pnpm sql-watch` to generate types
  totalIssueCount: S.sql<{
  c: number
}>`SELECT COUNT(*) AS c FROM issue`,

  filterState: S.sql<{
  
}>`SELECT * FROM filter_state`,

  boardIssues: (filters: FilterState, cursor: Issue) => {
    return `SELECT * FROM issue ${filterStateToWhere(filters, null)} ORDER BY kanbanorder ASC` as Query<Issue>
  },

  listIssues: (filters: FilterState, cursor: Issue | null) => {
    return `SELECT * FROM
      issue
      ${filterStateToWhere(filters, cursor)}
      ${filterStateToOrder(filters)}
      LIMIT ?` as Query<Issue>
  },

  issue: S.sql<{
  id: ID_of<Issue>;
  title: string;
  creator: string;
  priority: "none" | "urgent" | "high" | "low" | "medium";
  status: "backlog" | "todo" | "in_progress" | "done" | "canceled";
  created: number;
  modified: number;
  kanbanorder: any | null
}>`SELECT * FROM issue WHERE id = ?`,

  issueDescription: S.sql<{
  id: ID_of<Issue>;
  body: string
}>`SELECT * FROM description WHERE id = ?`,

  issueComments: S.sql<{
  id: ID_of<Comment>;
  body: string;
  creator: string;
  issueId: ID_of<Issue> | null;
  created: number
}>`SELECT * FROM comment WHERE issueId = ?`,
}
