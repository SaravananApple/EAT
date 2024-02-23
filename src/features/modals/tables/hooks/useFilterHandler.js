import { useState } from "react";

const useFilterHandler = (initial) => {
  const [filterState, setFilterState] = useState(initial);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onFilterChange = (event) => {
    setFilterState((prevParams) => {
      let newParams = { ...prevParams };
      newParams = { ...prevParams, ...event.filter };

      return newParams;
    });
    return;
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e);
  };

  //clear filter
  const resetFilters = () => {
    setFilterState(initial);
    setGlobalFilterValue("");
  };

  return {
    filterState,
    setFilterState,
    onFilterChange,
    resetFilters,
    globalFilterValue,
    onGlobalFilterChange,
  };
};

export default useFilterHandler;
