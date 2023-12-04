import TopFilter from "../../components/TopFilter";
import IssueList, { ROW_HEIGHT } from "./IssueList";
import { decodeFilterState } from "../../domain/SchemaType";
import { first, useDB, useQuery2 } from "@vlcn.io/react";
import { queries } from "../../domain/queries";
import { DBName } from "../../domain/Schema";
import { useState } from "react";

function List({ showSearch = false }) {
  const ctx = useDB(DBName);
  const filterState = decodeFilterState(
    first(useQuery2(ctx, queries.filterState).data)
  );
  const issues =
    useQuery2(ctx, queries.listIssues(filterState, null), [
      // TODO: window height should be observed
      Math.floor(window.innerHeight / ROW_HEIGHT) * 3,
    ]).data ?? [];
  const filteredIssuesCount =
    first(useQuery2(ctx, queries.filteredIssueCount(filterState)).data)?.c ?? 0;

  const [indexOffset, setIndexOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const hasPrevPage = indexOffset > 0;
  const hasNextPage = filteredIssuesCount > indexOffset + issues.length;

  function onNextPage() {}

  function onPrevPage() {}

  return (
    <div className="flex flex-col flex-grow">
      <TopFilter
        filteredIssuesCount={filteredIssuesCount}
        showSearch={showSearch}
      />
      <IssueList
        issues={issues}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        loading={loading}
        startIndex={indexOffset}
      />
    </div>
  );
}

export default List;
