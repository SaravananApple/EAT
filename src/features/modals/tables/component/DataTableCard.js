import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import React, { useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import getDefaultColumnSelectorOptions from "../utils/columnUtility";
import { excelExportUtility } from "../utils/excelExportUtility";
import "../component/DataTableCard.css";

const DataTableCard = (props) => {
  const {
    value,
    children,
    showExcelExport = false,
    excelExportOptions,
    showClearFilters = true,
    onClearFilters,
    showGlobalSearch = true,
    globalSearchValue,
    onGlobalSearchChange,
    leftHeaderElements,
    rightHeaderElements,
    showColumnSelector = true,
    columnsInfo,
    style,
    dataTableProps,
  } = props;

  const dataTableRef = useRef();
  const columnSelectorOptions = [];

  // doubt
  if (columnsInfo) {
    Object.keys(columnsInfo).forEach((key) => {
      columnSelectorOptions.push({
        label: columnsInfo[key].displayName
          ? columnsInfo[key].displayName
          : key,
        value: key,
      });
    });
  } else {
    columnSelectorOptions = getDefaultColumnSelectorOptions(children);
  }

  const [columnToggle, setColumnToggle] = useState(
    columnSelectorOptions.map((option) => option.value)
  );

  const onExcelExport = () => {
    const options = {
      fileName: "export",
      toggledColumnsOnly: true,
      customFieldParser: undefined,
      ...excelExportOptions,
    };
    const visibleField = [];
    if (options.toggledColumnsOnly) {
      visibleField.push(...columnToggle);
    } else {
      visibleField.push(...columnSelectorOptions.map((option) => option.value));
    }

    excelExportUtility(
      dataTableProps,
      options.fileName,
      visibleField,
      options.customFieldParser
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-row justify-content-between align-items-center">
        <div className="flex flex-row align-items-center">
          {leftHeaderElements}
          {showExcelExport && (
            <Button
              label="Export"
              type="button"
              icon="pi pi-file-excel"
              onClick={onExcelExport}
              className={`p-button-outlined p-button-success ${
                leftHeaderElements ? "ml-2" : ""
              }`}
            />
          )}

          <div className="flex flex-row align-items-center clear_button">
            {rightHeaderElements}
            {showClearFilters && (
              <Button
                label="Clear Filter"
                icon="pi pi-filter-slash"
                onClick={onClearFilters}
                className={`p-button-outlined ${
                  rightHeaderElements || showColumnSelector ? "ml-2" : ""
                }`}
              />
            )}
            <div>
              <Button
                label="TODAY"
                icon="pi pi-calendar"
                className="ml-4 p-button-outlined p-button-info"
              />
            </div>
            <div>
              <Button
                label="WEEK"
                icon="pi pi-calendar"
                className="ml-4 p-button-outlined p-button-warning"
              />
            </div>

            <div>
              <Button
                label="YEAR"
                icon="pi pi-calendar"
                className="ml-4 p-button-outlined p-button-danger"
              />
            </div>

            {showGlobalSearch && (
              <span className="p-input-icon-left globalTableSearch">
                <i className="pi pi-search" />
                <DebounceInput
                  className="mt-0"
                  element={InputText}
                  value={globalSearchValue}
                  placeholder="Search..."
                  minLength={2}
                  debounceTimeout={400}
                  onChange={(event) => {
                    onGlobalSearchChange &&
                      onGlobalSearchChange(event.target.value);
                  }}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const childrenArray = [];

  if (children instanceof Array) {
    childrenArray.push(...children);
  } else if (children) {
    childrenArray.push(children);
  }

  return (
    <div style={style}>
      <DataTable
        paginator
        rows={7}
        rowsPerPageOptions={[5, 7, 10, 25, 50]}
        value={value}
        showGridlines
        stripedRows
        size="normal"
        scrollable
        scrollHeight="flex"
        ref={dataTableRef}
        header={renderHeader()}
      >
        {childrenArray.map((column) => {
          const columnProps = {
            dataType:
              columnsInfo && columnsInfo[column.props.field]?.type === "date"
                ? "date"
                : "text",
            showFilterOperator: false,
            showApplyButton: false,
            showClearButton: false,
            filterPlaceholder: "Search...",
            ...column.props,
          };

          return <Column key={columnProps.field} {...columnProps} />;
        })}
      </DataTable>
    </div>
  );
};

export default DataTableCard;
