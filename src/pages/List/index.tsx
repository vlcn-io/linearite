import TopFilter from '../../components/TopFilter'
import IssueList from './IssueList'
import { Issue } from '../../types'
// import { querySQL, sql } from '@livestore/livestore'
// import { useQuery } from '@livestore/livestore/react'
import { AppState } from '../../domain/schema'
import { filterStateToOrder, filterStateToWhere } from '../../utils/filterState'

// const filterClause$ = querySQL<AppState>(`select * from app_state WHERE key = 'filter_state';`)
//   // .getFirstRow({defaultValue: undefined })
//   .pipe((filterStates) => {
//     // TODO this handling should be improved (see https://github.com/livestorejs/livestore/issues/22)
//     if (filterStates.length === 0) return ''
//     const filterStateObj = JSON.parse(filterStates[0]!.value)
//     return filterStateToWhere(filterStateObj) + ' ' + filterStateToOrder(filterStateObj)
//   })
// const visibleIssues$ = querySQL<Issue>((get) => sql`select * from issue ${get(filterClause$)}`)

function List({ showSearch = false }) {
  // const issues = useQuery(visibleIssues$)
  const issues: Issue[] = []

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter issues={issues} showSearch={showSearch} />
      <IssueList issues={issues} />
    </div>
  )
}

export default List
