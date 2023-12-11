import TopFilter from "../../components/TopFilter";
import IssueList, { ROW_HEIGHT } from "./IssueList";
import { Issue, decodeFilterState } from "../../domain/SchemaType";
import { first, useDB, useQuery2 } from "@vlcn.io/react";
import { queries } from "../../domain/queries";
import { DBName } from "../../domain/Schema";
import { useMemo, useState } from "react";

function List({ showSearch = false }) {
  const ctx = useDB(DBName);
  const filterState = decodeFilterState(
    first(useQuery2(ctx, queries.filterState).data)
  );
  // TODO: observe window height and update limit
  const pageSize = Math.floor(window.innerHeight / ROW_HEIGHT);
  const [cursor, setCursor] = useState<Issue | null>(null);
  const [backwardFetch, setBackwardFetch] = useState(false);
  const [indexOffset, setIndexOffset] = useState(0);
  const limit = pageSize * 3;
  const issues$ = useQuery2(
    ctx,
    queries.listIssues(filterState, cursor, backwardFetch),
    [limit]
  );
  const filteredIssuesCount =
    first(useQuery2(ctx, queries.filteredIssueCount(filterState)).data)?.c ?? 0;
  const hasPrevPage = indexOffset > 0;
  const hasNextPage = filteredIssuesCount > indexOffset + issues$.data.length;

  function onNextPage() {
    if (issues$.loading) {
      return;
    }
    // Fetch limit amount of issues
    // starting at indexOffset + pageSize cursor
    const newOffset = indexOffset + pageSize;
    setBackwardFetch(false);
    setCursor(issues$.data[pageSize - 1]);
    setIndexOffset(newOffset);
  }

  function onPrevPage() {
    if (issues$.loading) {
      return;
    }
    // Fetch limit amount of issues
    // starting at indexOffset - pageSize cursor
    const newOffset = Math.max(indexOffset - pageSize, 0);
    // // We need to indicate this is a backwards fetch...
    setBackwardFetch(true);
    setCursor(issues$.data[issues$.data.length - pageSize]);
    setIndexOffset(newOffset);
  }

  const rows = useMemo(() => {
    if (backwardFetch) {
      return issues$.data.concat().reverse();
    }
    return issues$.data;
  }, [issues$.data, backwardFetch]);

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter
        filteredIssuesCount={filteredIssuesCount}
        showSearch={showSearch}
      />
      <IssueList
        issues={rows}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        loading={issues$.loading}
        startIndex={indexOffset}
        totalRows={filteredIssuesCount}
      />
    </div>
  );
}

export default List;
