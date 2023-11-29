import TopFilter from '../../components/TopFilter'
import IssueBoard from './IssueBoard'
import { decodeFilterState } from '../../domain/SchemaType';
import { first, useDB, useQuery2 } from '@vlcn.io/react';
import { queries } from '../../domain/queries';
import { DBName } from '../../domain/Schema';

function Board() {
  const ctx = useDB(DBName)
  const filterState = decodeFilterState(first(useQuery2(ctx, queries.filterState).data))
  const issues = useQuery2(ctx, queries.boardIssues(filterState)).data ?? []

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TopFilter title="Board" issues={issues} hideSort={true} />
      <IssueBoard issues={issues} />
    </div>
  )
}

export default Board
