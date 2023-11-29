import TopFilter from '../../components/TopFilter'
import IssueBoard from './IssueBoard'
import { Issue } from '../../types'
import { filterStateToWhere } from '../../utils/filterState'
// import { querySQL, sql } from '@livestore/livestore'
// import { useQuery } from '@livestore/livestore/react'

// const filterClause$ = querySQL<AppState>(`select * from app_state WHERE key = 'filter_state';`)
//   // .getFirstRow({defaultValue: undefined })
//   .pipe((filterStates) => {
//     // TODO this handling should be improved (see https://github.com/livestorejs/livestore/issues/22)
//     if (filterStates.length === 0) return ''
//     const filterStateObj = JSON.parse(filterStates[0]!.value)
//     return filterStateToWhere(filterStateObj)
//   })
// const issues$ = querySQL<Issue>((get) => sql`SELECT * FROM issue ${get(filterClause$)} ORDER BY kanbanorder ASC`)

function Board() {
  // const issues = useQuery(issues$)
  const issues: Issue[] = [];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopFilter title="Board" issues={issues} hideSort={true} />
      <IssueBoard issues={issues} />
    </div>
  )
}

export default Board
