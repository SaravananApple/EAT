import React from "react";

const getDefaultColumnSelectorOptions = (columns) => {
  const columnArray = [];
  if (Array.isArray(columns)) {
    columnArray.push(...columns);
  } else {
    columnArray.push(...columns);
  }
  const fieldArray = [];
  columnArray.forEach((column) => {
    if (column.props.field) {
      fieldArray.push({
        value: column.props.field,
        label: column.props.field,
      });
    }
  });

  return fieldArray;
};

export default getDefaultColumnSelectorOptions;
