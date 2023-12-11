import { type CSSProperties } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import IssueRow from "./IssueRow";
import { Issue } from "../../domain/SchemaType";
import VirtualTable from "./VirtualTable";

export const ROW_HEIGHT = 36;
export interface IssueListProps {
  issues: readonly Issue[];
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  loading: boolean;
  startIndex: number;
  totalRows: number;
}

function IssueList({
  issues,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  loading,
  startIndex,
  totalRows,
}: IssueListProps) {
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
            totalRows={totalRows}
            startIndex={startIndex}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            loading={loading}
          />
        )}
      </AutoSizer>
    </div>
  );
}

function rowRenderer(issue: Issue, style: CSSProperties) {
  return <IssueRow key={`issue-${issue.id}`} issue={issue} style={style} />;
}

export default IssueList;
