import React, { useRef, useState } from "react";
import Header from "../../layout/Header/Header";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useMutation, useQueryClient } from "react-query";
import API from "../../../utils/API";
import useFilterHandler from "../../../features/modals/tables/hooks/useFilterHandler";
import usePaginationHandler from "../../../features/modals/tables/hooks/usePaginationHandler";
import useSortHandlers from "../../../features/modals/tables/hooks/useSortHandlers";
import { getInitialFilter } from "../../../features/modals/tables/utils/filterUtility";
import "../../../components/maindash/maincomponent/AddTaskList.css";
import DataTableCard from "../../../features/modals/tables/component/DataTableCard";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { useGetCheckList } from "../../../utils/AddTaskServices";
import AddCheckModal from "../../../features/modals/AddCheckModal";
import EditCheckField from "../../../features/modals/components/EditCheckField";

const CheckList = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteTaskVisible, setDeleteTaskVisible] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);

  const toast = useRef(null);

  const {
    filterState,
    onFilterChange,
    resetFilters,
    globalFilterValue,
    onGlobalFilterChange,
  } = useFilterHandler(getInitialFilter(columnsInfo));

  const { pageState, resetPage, onPageChange } = usePaginationHandler({
    first: 0,
    page: 0,
    rows: 25,
  });

  const { sortState, onSortChange } = useSortHandlers({
    sortField: "file_no",
    sortOrder: 1,
    multiSortMeta: [],
  });

  const { data: taskData, isLoading } = useGetCheckList(
    "http://localhost:1337/api/check-points"
  );

  // use this state for delete functionality purpose
  const [task, setTask] = useState(taskData);

  const confirmDeleteTask = (task) => {
    setTask(task);
    setDeleteTaskVisible(true);
  };

  const hideDeleteTasksDialog = () => {
    setDeleteTaskVisible(false);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteData } = useMutation({
    mutationFn: (data) =>
      API.deleteData(data, "http://localhost:1337/api/check-points"),

    onSuccess: () => {
      queryClient.invalidateQueries("checks");

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    },

    onError: (error) => {
      let message = "Something went wrong when attempting to add the entry";
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        message = "Error: " + error.response.data.error.message;
      }
      toast.current.show({
        severity: "warn",
        summary: "Failed",
        detail: message,
        life: 6000,
      });
    },
  });

  const deleteSelectedTasks = (task) => {
    deleteData(task.id);

    setDeleteTaskVisible(false);
  };

  const deleteTasksDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteTasksDialog}
      />
      <Button
        className="ml-2"
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => {
          deleteSelectedTasks(task);
        }}
      />
    </React.Fragment>
  );

  let emptyProduct = {
    file_no: "",
    pick_date: null,
    completed_date: null,
    pick_time: "",
    idle_time: "",
    completed_time: "",
    status: "",
    remarks: "",
  };

  // use this state for edit functionality purpose
  const [taskDataEdit, setTaskDataEdit] = useState(emptyProduct);

  const editTask = (taskData) => {
    setTaskDataEdit({ ...taskData });
    setTaskDialog(true);
  };

  const hideDialog = () => {
    setTaskDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-3"
          tooltip="Edit"
          data-pr-position="top"
          onClick={() => {
            editTask(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          tooltip="Delete"
          data-pr-position="top"
          onClick={() => {
            confirmDeleteTask(rowData);
          }}
        />
      </React.Fragment>
    );
  };

  const dateBodyFilter = (e) => {
    onFilterChange(e.value);
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case "Yes":
        return "success";

      case "N/A":
        return "warning";

      case "No":
        return "danger";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.check_paragraph_styles}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <Header
        pageTitle="Add CheckPoints"
        actionItems={
          <Button
            label="Add CheckPoint"
            icon="pi pi-plus"
            onClick={() => {
              setAddModalVisible(true);
            }}
          />
        }
      />
      <AddCheckModal
        visible={addModalVisible}
        onHide={() => setAddModalVisible(false)}
      />
      <div className="surface-card shadow-2 border-round flex-grow-1 addTask">
        <DataTableCard
          dataTableProps={taskData ? taskData.data : []}
          value={taskData ? taskData.data : []}
          loading={isLoading}
          dataKey="id"
          emptyMessage="No Check Point found."
          lazy
          columnsInfo={columnsInfo}
          selectionMode={"single"}
          filters={filterState}
          onFilter={onFilterChange}
          onClearFilters={resetFilters}
          globalSearchValue={globalFilterValue}
          onGlobalSearchChange={onGlobalFilterChange}
          sortField={sortState.sortField}
          sortOrder={sortState.sortOrder}
          onSort={(event) => {
            resetPage();
            onSortChange(event);
          }}
          paginator
          rows={pageState.rows}
          first={pageState.first}
          onPage={onPageChange}
          showExcelExport
          excelExportOptions={{
            fileName: "Tasks",
            customFieldParser,
          }}
          style={{
            height: "940px",
            width: "1620px",
          }}
          showGridlines={true}
        >
          <Column
            field="file_no"
            header={columnsInfo["file_no"].displayName}
            sortable
            filter
          />
          <Column
            field="check_responsiveness"
            header={columnsInfo["check_responsiveness"].displayName}
            sortable
            filter
          />
          <Column
            field="validate_html_css"
            header={columnsInfo["validate_html_css"].displayName}
            sortable
            filter
          />
          <Column
            field="optimize_scripts"
            header={columnsInfo["optimize_scripts"].displayName}
            sortable
            filter
          />
          <Column
            field="optimize_images"
            header={columnsInfo["optimize_images"].displayName}
            sortable
            filter
          />
          <Column
            field="optimize_css"
            header={columnsInfo["optimize_css"].displayName}
            sortable
            filter
          />
          <Column
            field="upload_favicon"
            header={columnsInfo["upload_favicon"].displayName}
            sortable
            filter
          />
          <Column
            field="check_paragraph_styles"
            header={columnsInfo["check_paragraph_styles"].displayName}
            sortable
            filter
          />
          <Column
            className="flex"
            body={actionBodyTemplate}
            header="Task Actions"
          />
        </DataTableCard>
      </div>
      <Dialog
        visible={deleteTaskVisible}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteTasksDialogFooter}
        onHide={hideDeleteTasksDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {<span>Are you sure you want to delete the selected task</span>}
        </div>
      </Dialog>
      <EditCheckField
        visible={taskDialog}
        setTaskDialog={setTaskDialog}
        onHide={hideDialog}
        taskDataEdit={taskDataEdit}
        setTaskDataEdit={setTaskDataEdit}
      />
    </div>
  );
};

const columnsInfo = {
  id: { displayName: "ID" },
  file_no: { displayName: "File NO" },
  check_responsiveness: { displayName: "Check responsiveness" },
  validate_html_css: { displayName: "Validate Html/CSS" },
  optimize_scripts: { displayName: "Optimize scripts" },
  optimize_images: { displayName: "Optimize images" },
  optimize_css: { displayName: "Optimize CSS" },
  upload_favicon: { displayName: "Upload favicon" },
  check_paragraph_styles: { displayName: "Check paragraph styles" },
};

const customFieldParser = {
  projects: (data) => {
    return data
      .map((project) => {
        return project.attributes.short_name;
      })
      .join(", ");
  },
};

export default CheckList;
