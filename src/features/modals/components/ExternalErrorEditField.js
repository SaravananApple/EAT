import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getDefaultFormValues } from "../utils/modalUtility";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import API from "../../../utils/API";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import ExternalErrorEditModalField from "./ExternalErrorEditModalField";

const ExternalErrorEditField = (props) => {
  const { visible, onHide, editValue, taskDataEdit, setTaskDataEdit, fields } =
    props;

  const taskModalFields = [
    {
      field: "file_no",
      label: "File No",
      type: "number",
      registerOptions: { required: "File number is required" },
      taskDataEditFilename: taskDataEdit.file_no,
    },
    {
      field: "est",
      label: "Estimated Hours",
      type: "number",
      registerOptions: { required: "please select est date" },
      taskDataEditFilename: taskDataEdit.est,
    },

    {
      field: "start_date",
      label: "Start Date",
      type: "date",
      registerOptions: { required: "please select pick date" },
      taskDataEditFilename: moment(taskDataEdit.pick_date).toDate(),
    },
    {
      field: "reviewer_record",
      label: "Reviewer Record",
      type: "textArea",
      registerOptions: { required: "Please select reviewer code" },
      taskDataEditFilename: taskDataEdit.reviewer_record,
    },
    {
      field: "end_date",
      label: "End Date",
      type: "date",
      registerOptions: { required: "please select completed date" },
      taskDataEditFilename: moment(taskDataEdit.completed_date).toDate(),
    },
    {
      field: "define_error",
      label: "Define Error",
      type: "text",
      registerOptions: { required: "Please define the error" },
      taskDataEditFilename: taskDataEdit.define_error,
    },
    {
      field: "containment",
      label: "Containment",
      type: "text",
      registerOptions: { required: "Please fill the Containment" },
      taskDataEditFilename: taskDataEdit.containment,
    },
    {
      field: "determine_root_cause",
      label: "Determine Root Cause",
      type: "text",
      registerOptions: { required: "Please fill the Root Cause" },
      taskDataEditFilename: taskDataEdit.determine_root_cause,
    },
    {
      field: "corrective_action",
      label: "Corrective Action",
      type: "text",
      registerOptions: { required: "Please fill the Corrective Action" },
      taskDataEditFilename: taskDataEdit.corrective_action,
    },

    {
      field: "preventive_action",
      label: "Preventive Action",
      type: "text",
      registerOptions: { required: "Please fill the Preventive Action" },
      taskDataEditFilename: taskDataEdit.preventive_action,
    },
    {
      field: "status",
      label: "status code",
      type: "dropdown",
      registerOptions: { required: "Please select status code" },
      taskDataEditFilename: taskDataEdit.status,
    },
    {
      field: "time_taken",
      label: "Time Taken",
      type: "time",
      registerOptions: { required: "please enter Time Taken" },
      taskDataEditFilename: taskDataEdit.time_taken,
    },
    {
      field: "effort",
      label: "Effort",
      type: "time",
      registerOptions: { required: "please enter effort time" },
      taskDataEditFilename: taskDataEdit.effort,
    },
    {
      field: "remarks",
      label: "Remarks",
      type: "text",
      registerOptions: { required: "please enter remarks time" },
      taskDataEditFilename: taskDataEdit.remarks,
    },
  ];

  const taskDataValue = useForm({
    defaultValues: getDefaultFormValues(taskModalFields),
  });

  const { control, handleSubmit, reset, clearErrors } = taskDataValue;

  const toastRef = useRef(null);

  const taskId = taskDataEdit.id;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (visible) {
      clearErrors();
      reset();
    }
  }, [visible]);

  const { mutate: updateErrorEditData, isLoading: mutateLoading } = useMutation(
    {
      mutationFn: (data) => {
        API.updateInformationById(
          taskId,
          data,
          "http://localhost:1337/api/external-errors"
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries("external");

        onHide();
        // reset();

        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "The entry was added successfully",
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
        toastRef.current.show({
          severity: "warn",
          summary: "Failed",
          detail: message,
          life: 6000,
        });
      },
    }
  );

  const onValidSubmit = (data) => {
    const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
      let type = "text";
      const field = taskModalFields.find((field) => field.field === key);
      if (field) {
        type = field.type;
      }
      if (value !== "" && value !== null && value !== undefined) {
        acc[key] = value;
      } else if (type === "dropdown") {
        acc[key] = value.status;
      } else if (type === "time") {
        acc[key] = value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    updateErrorEditData(formattedData);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          id="cancel"
          label="Cancel"
          onClick={onHide}
          className="p-button-outlined p-button-secondary mr-3"
        />
        <Button
          id="add"
          label="Submit"
          icon={mutateLoading ? "pi pi-spin pi-spinner" : "pi pi-check"}
          onClick={handleSubmit(onValidSubmit)}
          disabled={mutateLoading}
        />
      </div>
    );
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Dialog
        visible={visible}
        header="Edit Error"
        modal
        className="p-fluid"
        onHide={onHide}
        footer={renderFooter}
        style={{ maxWidth: 1200, minWidth: 600 }}
        closable
        draggable={false}
        resizable={false}
      >
        <div className="grid">
          {taskModalFields.map((options, index) => {
            return (
              <div
                key={index}
                className={`col-6 ${index % 2 === 0 ? "pr-3" : "pl-3"}`}
              >
                <ExternalErrorEditModalField
                  {...options}
                  control={control}
                  valuesTaskEdit={editValue}
                  taskDataEdit={taskDataEdit}
                  setTaskDataEdit={setTaskDataEdit}
                  taskModalFields={taskModalFields}
                />
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default ExternalErrorEditField;
