import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Controller } from "react-hook-form";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";

const CheckModalField = (props) => {
  const { field, label, type, registerOptions, control } = props;

  const [selectStatus, setSelectStatus] = useState("");

  const placeHolder = getDefaultPlaceholder(type);

  const status = ["Yes", "No", "N/A"];

  const renderInput = ({ field: formField, formState }) => {
    let input;

    if (type === "text" || type === "number") {
      input = (
        <InputText
          id={field}
          placeholder={placeHolder}
          keyfilter={type === "number" ? "int" : undefined}
          className={classNames(
            {
              "p-invalid": formState.errors[field] !== undefined,
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }
    if (type === "textArea") {
      input = (
        <InputTextarea
          id={field}
          placeholder={placeHolder}
          {...formField}
          className={classNames(
            {
              "p-invalid": formState.errors[field],
            },
            "mt-1"
          )}
        />
      );
    }
    if (type === "dropdown") {
      const statusCode = status;
      input = (
        <Dropdown
          value={selectStatus}
          id={field}
          placeholder={placeHolder}
          options={statusCode}
          //   optionLabel="status"
          className={classNames(
            {
              "p-invalid": formState.errors[field],
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }
    if (type === "date") {
      input = (
        <Calendar
          id={field}
          placeholder={placeHolder}
          {...formField}
          className={classNames(
            {
              "p-invalid": formState.errors[field],
            },
            "mt-1"
          )}
        />
      );
    }
    if (type === "time") {
      input = (
        <Calendar
          id={field}
          {...formField}
          placeholder={placeHolder}
          timeOnly
          hourFormat="24"
          className={classNames(
            {
              "p-invalid": formState.errors[field],
            },
            "mt-1"
          )}
        />
      );
    }

    return (
      <div className="flex flex-column">
        <label className="font-bold" htmlFor={field}>
          {label + (registerOptions && registerOptions.required ? "*" : "")}
        </label>
        {input}
        <small className="p-error">
          {formState.errors[field] ? formState.errors[field].message : ""}
        </small>
      </div>
    );
  };

  return (
    <div>
      <Controller
        control={control}
        name={field}
        rules={registerOptions}
        render={renderInput}
      />
    </div>
  );
};
const getDefaultPlaceholder = (type) => {
  if (type === "text" || type === "textArea") {
    return "Enter text";
  }
  if (type === "number") {
    return "Enter number";
  }
  if (type === "dropdown") {
    return "Select an option";
  }
  if (type === "resource") {
    return "Select a resource";
  }
  if (type === "client") {
    return "Select a client";
  }
  if (type === "date") {
    return "Enter a date";
  }
  if (type === "center") {
    return "Select a center";
  }
  if (type === "practice") {
    return "Select a practice";
  }
  if (type === "time") {
    return "Enter the Time";
  }
  return "";
};

export default CheckModalField;
