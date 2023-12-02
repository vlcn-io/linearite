import { FixedSizeList as List, areEqual } from 'react-window'
import { memo, type CSSProperties } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import IssueRow from './IssueRow'
import { Issue } from '../../domain/SchemaType'
import VirtualTable from './VirtualTable'

export const ROW_HEIGHT = 36;
export interface IssueListProps {
  issues: readonly Issue[]
}

// function IssueList({ issues }: IssueListProps) {
//   return (
//     <div className="grow">
//       <AutoSizer>
//         {({ height, width }: { width: number; height: number }) => (
//           <List height={height} itemCount={issues.length} itemSize={36} itemData={issues as Issue[]} width={width}>
//             {VirtualIssueRow}
//           </List>
//         )}
//       </AutoSizer>
//     </div>
//   )
// }

function IssueList({issues}: IssueListProps) {
    return (
    <div className="grow">
      <AutoSizer>
        {({ height, width }: { width: number; height: number }) => (
          <VirtualTable
            rowRenderer={rowRenderer}
            width={width}
            height={height}
            rowHeight={ROW_HEIGHT}
            rows={issues}
            startIndex={0}
            onNextPage={() => {}}
            onPrevPage={() => {}}
            hasNextPage={false}
            hasPrevPage={false}
            loading={false}
           />
        )}
      </AutoSizer>
    </div>
  )
}

function rowRenderer(issue: Issue, style: CSSProperties) {
  return <IssueRow key={`issue-${issue.id}`} issue={issue} style={style} />

}

const VirtualIssueRow = memo(
  ({ data: issues, index, style }: { data: Issue[]; index: number; style: CSSProperties }) => {
    const issue = issues[index]
    return <IssueRow key={`issue-${issue.id}`} issue={issue} style={style} />
  },
  areEqual,
)

export default IssueList
