import TopFilter from '../../components/TopFilter'
import IssueList, { ROW_HEIGHT } from './IssueList'
import { first, useDB, useQuery2 } from '@vlcn.io/react'
import { queries } from '../../domain/queries'
import { DBName } from '../../domain/Schema'
import { useFilterState } from '../../hooks/useFilterState'

function List({ showSearch = false }) {
  const ctx = useDB(DBName)
  const [filterState] = useFilterState()
  const issues = useQuery2(ctx, queries.listIssues(filterState, null), [
     // TODO: window height should be observed
    Math.floor(window.innerHeight / ROW_HEIGHT) * 3
  ]).data ?? []
  const filteredIssuesCount = first(
    useQuery2(ctx, queries.filteredIssueCount(filterState)).data
  )?.c ?? 0

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter filteredIssuesCount={filteredIssuesCount} showSearch={showSearch} />
      <IssueList issues={issues} />
    </div>
  )
}

export default List
