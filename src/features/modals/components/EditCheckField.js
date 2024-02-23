import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getDefaultFormValues } from "../utils/modalUtility";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import API from "../../../utils/API";
import { useMutation, useQueryClient } from "react-query";
import EditCheckModalField from "./EditCheckModalField";

const EditCheckField = (props) => {
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
      field: "check_responsiveness",
      label: "Check responsiveness",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.check_responsiveness,
    },
    {
      field: "validate_html_css",
      label: "Validate Html/CSS",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.validate_html_css,
    },
    {
      field: "optimize_scripts",
      label: "Optimize scripts",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.optimize_scripts,
    },
    {
      field: "optimize_images",
      label: "Optimize images",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.optimize_images,
    },
    {
      field: "optimize_css",
      label: "Optimize CSS",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.optimize_css,
    },
    {
      field: "upload_favicon",
      label: "Upload favicon",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.upload_favicon,
    },
    {
      field: "check_paragraph_styles",
      label: "Check paragraph styles",
      type: "dropdown",
      registerOptions: { required: "Please select the check point" },
      taskDataEditFilename: taskDataEdit.check_paragraph_styles,
    },
  ];

  const taskDataValue = useForm({
    defaultValues: getDefaultFormValues(taskModalFields),
  });

  const { control, handleSubmit, reset, clearErrors } = taskDataValue;

  useEffect(() => {
    if (visible) {
      clearErrors();
    }
  }, [visible]);

  const toastRef = useRef(null);

  const taskId = taskDataEdit.id;

  const queryClient = useQueryClient();

  const { mutate: updateData, isLoading: mutateLoading } = useMutation({
    mutationFn: (data) => {
      API.updateInformationById(
        taskId,
        data,
        "http://localhost:1337/api/check-points"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("checks");
      queryClient.setQueryData(["checks"]);
      reset();
      onHide();

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
  });

  useEffect(() => {
    queryClient.invalidateQueries("checks");
  }, []);

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
    updateData(formattedData);
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
        header="Edit CheckPoint"
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
                <EditCheckModalField
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

export default EditCheckField;
