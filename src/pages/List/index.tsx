import TopFilter from '../../components/TopFilter'
import IssueList from './IssueList'
import { decodeFilterState } from '../../domain/SchemaType'
import { first, useDB, useQuery2 } from '@vlcn.io/react'
import { queries } from '../../domain/queries'
import { DBName } from '../../domain/Schema'

function List({ showSearch = false }) {
  const ctx = useDB(DBName)
  const filterState = decodeFilterState(first(useQuery2(ctx, queries.filterState).data))
  const issues = useQuery2(ctx, queries.listIssues(filterState)).data ?? []

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter issues={issues} showSearch={showSearch} />
      <IssueList issues={issues} />
    </div>
  )
}

export default List
