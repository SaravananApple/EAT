import React, { useRef, useState } from "react";
import Header from "../../layout/Header/Header";
import { Button } from "primereact/button";
import AddTaskModal from "../../../features/modals/AddTaskModal";
import { Column } from "primereact/column";
import { useMutation, useQueryClient } from "react-query";
import API from "../../../utils/API";
import useFilterHandler from "../../../features/modals/tables/hooks/useFilterHandler";
import usePaginationHandler from "../../../features/modals/tables/hooks/usePaginationHandler";
import useSortHandlers from "../../../features/modals/tables/hooks/useSortHandlers";
import { getInitialFilter } from "../../../features/modals/tables/utils/filterUtility";
import "../../../components/maindash/maincomponent/AddTaskList.css";
import DataTableCard from "../../../features/modals/tables/component/DataTableCard";
import {
  dateBodyTemplate,
  effortTimeBodyFilter,
  estTimeBodyFilter,
} from "../../../features/tables/templates/DateTemplates";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import EditTaskField from "../../../features/modals/components/EditTaskField";
import { useGetTaskList } from "../../../utils/AddTaskServices";

const TaskHistory = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteCheckVisible, setDeleteCheckVisible] = useState(false);
  const [checkDialog, setCheckDialog] = useState(false);

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

  const { data: taskData, isLoading } = useGetTaskList(
    "http://localhost:1337/api/tasks"
  );

  // use this state for delete functionality purpose
  const [task, setTask] = useState(taskData);

  const confirmDeleteTask = (task) => {
    setTask(task);
    setDeleteCheckVisible(true);
  };

  const hideDeleteTasksDialog = () => {
    setDeleteCheckVisible(false);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteData } = useMutation({
    mutationFn: (data) =>
      API.deleteData(data, "http://localhost:1337/api/tasks"),

    onSuccess: () => {
      queryClient.invalidateQueries("tasks");

      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Task Deleted",
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

    setDeleteCheckVisible(false);
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
    check_responsiveness: "",
    validate_html_css: null,
    optimize_scripts: null,
    optimize_images: "",
    optimize_css: "",
    upload_favicon: "",
    check_paragraph_styles: "",
  };

  // use this state for edit functionality purpose
  const [taskDataEdit, setTaskDataEdit] = useState(emptyProduct);

  const editTask = (taskData) => {
    setTaskDataEdit({ ...taskData });
    setCheckDialog(true);
  };

  const hideDialog = () => {
    setCheckDialog(false);
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
      case "Delivery":
        return "success";

      case "WIP":
        return "warning";

      case "Rework":
        return "danger";

      case "Completed":
        return "info";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
  };

  return (
    <div>
      <Toast ref={toast} />

      <Header pageTitle="Task History" />

      <AddTaskModal
        visible={addModalVisible}
        onHide={() => setAddModalVisible(false)}
      />
      <div className="surface-card shadow-2 border-round flex-grow-1">
        <DataTableCard
          dataTableProps={taskData ? taskData.data : []}
          value={taskData ? taskData.data : []}
          loading={isLoading}
          dataKey="id"
          emptyMessage="No tasks found."
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
            field="est"
            body={estTimeBodyFilter}
            header={columnsInfo["est"].displayName}
            sortable
            filter
          />

          <Column
            field="start_date"
            header={columnsInfo["start_date"].displayName}
            body={dateBodyTemplate}
            filterElement={
              <Calendar
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
                mask="99/99/9999"
              />
            }
            sortable
            filter
          />
          <Column
            field="end_date"
            header={columnsInfo["end_date"].displayName}
            body={dateBodyTemplate}
            filterElement={
              <Calendar
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
                mask="99/99/9999"
                onChange={dateBodyFilter}
              />
            }
            sortable
            filter
          />

          <Column
            field="effort"
            body={effortTimeBodyFilter}
            header={columnsInfo["effort"].displayName}
            sortable
            filter
          />
          <Column
            field="reviewer"
            header={columnsInfo["reviewer"].displayName}
            sortable
            filter
          />
          <Column
            field="status"
            header={columnsInfo["status"].displayName}
            body={statusBodyTemplate}
            sortable
            filter
          />
          <Column field="remarks" header={columnsInfo["remarks"].displayName} />

          <Column
            className="flex"
            body={actionBodyTemplate}
            header="Task Actions"
          />
        </DataTableCard>
      </div>
      <Dialog
        visible={deleteCheckVisible}
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
          {
            <span>
              Are you sure you want to delete the selected Check Point
            </span>
          }
        </div>
      </Dialog>
      <EditTaskField
        visible={checkDialog}
        setCheckDialog={setCheckDialog}
        onHide={hideDialog}
        taskDataEdit={taskDataEdit}
        setTaskDataEdit={setTaskDataEdit}
      />
    </div>
  );
};

const columnsInfo = {
  id: { displayName: "ID" },
  file_no: { displayName: "File No" },
  est: { displayName: "Estimated Hours" },
  start_date: { displayName: "Satrt Date" },
  end_date: { displayName: "End Date" },
  effort: { displayName: "Effort" },
  reviewer: { displayName: "Reviewer" },
  status: { displayName: "Status Code" },
  remarks: { displayName: "Remarks" },
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

export default TaskHistory;
