import { Button } from "primereact/button";
import React, { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { getDefaultFormValues } from "../utils/modalUtility";
import { useMutation, useQueryClient } from "react-query";
import { Toast } from "primereact/toast";
import API from "../../../utils/API";
import CheckModalField from "./CheckModalField";

const CheckModal = (props) => {
  const { visible, onHide, fields, title } = props;

  const toastRef = useRef(null);

  const { control, handleSubmit, reset, clearErrors } = useForm({
    defaultValues: getDefaultFormValues(fields),
  });

  useEffect(() => {
    if (visible) {
      clearErrors();
      reset();
    }
  }, [visible]);

  const queryClient = useQueryClient();
  const { mutate: postData, isLoading: mutateLoading } = useMutation({
    mutationFn: (data) =>
      API.postData(data, "http://localhost:1337/api/check-points"),

    onSuccess: () => {
      queryClient.invalidateQueries("checks");
      reset();
      onHide();
      toastRef.current.show({
        severity: "success",
        summary: "success",
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

  const onValidSubmit = (data) => {
    const formattedData = Object.entries(data).reduce((acc, [key, value]) => {
      // It's having the values like key value pair

      let type = "dropdown";

      // It's having the fields such as field, label, register options which is notify the message when the form is not filled and type.
      const field = fields.find((field) => field.field === key);

      if (field) {
        type = field.type;
      }

      if (value !== "" && value !== null && value !== undefined) {
        if (value.value) {
          // set values undefined
          acc[key] = value.value;
        } else if (type === "dropdown") {
          acc[key] = value;
        } else {
          acc[key] = value;
        }
      }

      return acc;
    }, {});

    postData(formattedData);
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
    <div>
      <Toast ref={toastRef} />
      <Dialog
        visible={visible}
        onHide={onHide}
        resizable={false}
        draggable={false}
        closable
        header={title}
        footer={renderFooter}
        style={{ maxWidth: 1200, minWidth: 600 }}
      >
        <div className="grid">
          {fields.map((options, index) => {
            return (
              <div
                key={index}
                className={`col-6 ${index % 2 === 0 ? "pr-3" : "pl-3"}`}
              >
                <CheckModalField {...options} control={control} />
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};

export default CheckModal;
