import React, { memo, useState } from "react";
import css from "./VirtualTable.module.css";

/**
 * - over-scan on rows
 * - keep track of offset start for row set
 * 
 * "fetchNextPage(startIndex, startCursor)"
 * page: startIndex
 * 
 * fetchNextPage can over-scan to pull in before window and after window items.
 * 2 windows worth of items?
 * Half window before and half window after?
 * Or 3 windows worth of items?
 * 
 * @param param0 
 * @returns 
 */
function VirtualTableBase<T>({
  rowRenderer,
  width,
  height,
  rowHeight,
  rows,
  startIndex,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  loading,
  className,
}: {
  className?: string;
  width: string | number;
  height: number;
  rowHeight: number;
  rows: readonly T[];
  startIndex: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  loading: boolean;
  hasPrevPage: boolean,
  hasNextPage: boolean
  rowRenderer: (
    row: T,
    style: { [key: string]: string | number }
  ) => React.ReactNode;
}) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    setScrollTop(scrollTop);

    if (Math.abs(scrollTop - prevScrollTop) > vp) {
      onJump();
    } else {
      onNearScroll();
    }

    // height -> height of container w/o scrolling
    const bottom =
      target.scrollHeight - target.scrollTop <= height / 3;
    const top = target.scrollTop <= height / 3;
    if (bottom && hasNextPage && !loading) {
      onNextPage();
    } else if (top && hasPrevPage && !loading) {
      onPrevPage();
    }
  };

  function onJump() {
    const viewport = tableContainerRef.current;
    if (!viewport) {
      return;
    }
    const scrollTop = viewport.scrollTop;
    const newPage = Math.floor(scrollTop * ((th - vp) / (h - vp)) * (1 / ph));
    setPage(newPage);
    setOffest(Math.round(newPage * cj));
    setPrevScrollTop(scrollTop);
  }

  function onNearScroll() {
    const viewport = tableContainerRef.current;
    if (!viewport) {
      return;
    }
    const scrollTop = viewport.scrollTop;

    // next scroll bar page
    if (scrollTop + offset > (page + 1) * ph) {
      const nextPage = page + 1;
      const nextOffset = Math.round(nextPage * cj);
      const newPrevScrollTop = scrollTop - cj;
      viewport.scrollTop = prevScrollTop;
      setPage(nextPage);
      setOffest(nextOffset);
      setPrevScrollTop(newPrevScrollTop);
    } else if (scrollTop + offset < page * ph) {
      // prev scroll bar page
      const nextPage = page - 1;
      const nextOffset = Math.round(nextPage * cj);
      const newPrevScrollTop = scrollTop + cj;
      viewport.scrollTop = prevScrollTop;
      setPage(nextPage);
      setOffest(nextOffset);
      setPrevScrollTop(newPrevScrollTop);
    } else {
      setPrevScrollTop(scrollTop);
    }
  }

  const items = rows.length + startIndex;
  const itemSize = rowHeight;
  const th = items * itemSize;
  const h = 33554400;
  const ph = h / 100;
  const n = Math.ceil(th / ph);
  const vp = height;
  const rh = rowHeight;
  const cj = (th - h) / (n - 1) > 0 ? (th - h) / (n - 1) : 1; // "jumpiness" coefficient
  const contentHeight = h > th ? th : h;

  // virtual pages, not real pages. Unrelated to items entirely.
  const [page, setPage] = useState(0);
  const [offset, setOffest] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const [scrollTop, setScrollTop] = useState(
    tableContainerRef.current?.scrollTop || 0
  );

  const buffer = vp;
  const y = scrollTop + offset;
  let top = Math.floor((y - buffer) / rh);
  let bottom = Math.ceil((y + vp + buffer) / rh);

  // top index for items in the viewport
  top = Math.max(0, top);
  // bottom index for items in the viewport
  bottom = Math.min(th / rh, bottom);

  const renderedRows = [];
  for (let i = top; i <= bottom; ++i) {
    // offset our index into `rows` by `startIndex`
    // `onNextPage` would fetch next page from
    // some offset into the current row set.
    // startIndex would be that offset...
    // startIndex grows, however, as we scroll down.
    // First re-fetch start index is 1/3rd of the way down.
    // We're fetching 3x the number of rows we need to display.
    const d = rows[i - startIndex];
    if (!d) {
      break;
    }
    renderedRows.push(rowRenderer(d, { height: rh, top: i * rh  - offset, position: 'absolute' }));
  }

  return (
    <div
      className={`${css.container} ${className}`}
      onScroll={handleScroll}
      ref={tableContainerRef}
      style={{
        width,
        height,
        position: "relative",
      }}
    >
      <div
        style={{
          height: contentHeight,
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      {renderedRows}
    </div>
  );
}

export default memo(VirtualTableBase) as typeof VirtualTableBase;
