import React from "react";
import { useState } from "react";

const useSortHandlers = (initial) => {
  const [sortState, setSortState] = useState(initial);

  const onSortChange = (event) => {
    setSortState({
      sortField: event.sortOrder !== 0 ? event.sortField : initial.sortField,
      sortOrder: event.sortOrder !== 0 ? event.sortOrder : 1,
      multiSortMeta: [],
    });
  };

  const resetSort = () => {
    setSortState(initial);
  };

  return { sortState, setSortState, onSortChange, resetSort };
};

export default useSortHandlers;
