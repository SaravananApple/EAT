import React from "react";
import { useState } from "react";

const usePaginationHandler = (initial) => {
  const [pageState, setPageState] = useState(initial);

  const onPageChange = (event) => {
    setPageState((prevParams) => {
      return { ...prevParams, ...event };
    });
  };

  const resetPage = () => {
    setPageState((prevParams) => {
      return { ...prevParams, first: 0, page: 0 };
    });
  };

  return { pageState, setPageState, onPageChange, resetPage };
};

export default usePaginationHandler;
