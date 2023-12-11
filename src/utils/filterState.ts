import { DecodedFilterState, Issue } from "../domain/SchemaType";

export function filterStateToWhere(
  filterState: DecodedFilterState,
  cursor: Issue | null,
  backwardFetch: boolean = false
) {
  const { status, priority, query } = filterState;
  let where = "WHERE ";
  const orig = where;
  if (status && status.length > 0) {
    where += `STATUS IN (${status.map((s) => "'" + s + "'").join(",")})`;
  }
  if (priority && priority.length > 0) {
    if (where !== orig) {
      where += " AND ";
    }
    where += `PRIORITY IN (${priority.map((s) => "'" + s + "'").join(",")})`;
  }
  if (query) {
    // TODO: description search too?
    // TODO: FTS5
    if (where !== orig) {
      where += " AND ";
    }
    where += `TITLE LIKE '%${query}%'`;
  }

  // Now check the order-by
  // and the cursor.
  // Add a constraint such that we will fetch what is after the cursor
  // if we have a cursor.
  if (cursor) {
    if (where !== orig) {
      where += " AND ";
    }
    let direction = filterState.orderDirection;
    if (backwardFetch) {
      direction = direction === "asc" ? "desc" : "asc";
    }
    const op = direction === "asc" ? ">" : "<";

    where += `("${filterState.orderBy}" ${op} '${cursor[filterState.orderBy]}'
      OR (
        ${filterState.orderBy} = '${cursor[filterState.orderBy]}' AND
        id ${op} '${cursor.id}'
      )
    )`;
  }

  if (where === orig) {
    return "";
  }

  return where;
}

export function filterStateToOrder(
  filterState: DecodedFilterState,
  backwardFetch: boolean = false
) {
  let direction = filterState.orderDirection;
  if (backwardFetch) {
    direction = direction === "asc" ? "desc" : "asc";
  }
  if (filterState.orderBy) {
    return `ORDER BY ${filterState.orderBy} ${direction}`;
  }

  return "";
}
