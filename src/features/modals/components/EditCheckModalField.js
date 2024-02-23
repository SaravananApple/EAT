import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const EditCheckModalField = (props) => {
  const {
    field,
    label,
    registerOptions,
    taskDataEdit,
    type,
    control,
    taskDataEditFilename,
  } = props;

  const formValues = useForm({
    defaultValues: {
      file_no: taskDataEdit.file_no,
      pick_date: taskDataEdit.pick_date,
      completed_date: taskDataEdit.completed_date,
      pick_time: taskDataEdit.pick_time,
      idle_time: taskDataEdit.idle_time,
      completed_time: taskDataEdit.completed_time,
      status: taskDataEdit.status,
      remarks: taskDataEdit.remarks,
    },
  });

  const { control: formValueControl } = formValues;

  //getting specific id data
  const [taskEditSet, setTaskEditSet] = useState(taskDataEdit);

  const onInputChange = (e) => {
    if (e.target !== undefined) {
      const { id, value } = e.target;
      if (value !== undefined) {
        setTaskEditSet({
          ...taskDataEdit,
          [id]: value,
        });
      }
    }
  };

  const onCalendarChange = (e) => {
    const { id, value } = e.target;

    setTaskEditSet({ ...taskEditSet, [id]: value });
  };

  const renderInput = ({ field: formField, formState }) => {
    let input;

    if (formField.name === "file_no") {
      input = (
        <InputText
          keyfilter={type === "number" ? "int" : undefined}
          onChange={(e) => onInputChange(e)}
          //return field name
          id={field}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    if (formField.name === "check_responsiveness") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }
    if (formField.name === "validate_html_css") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }
    if (formField.name === "optimize_scripts") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    if (formField.name === "optimize_images") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    if (formField.name === "optimize_css") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    if (formField.name === "upload_favicon") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    if (formField.name === "check_paragraph_styles") {
      input = (
        <InputText
          id={field}
          onChange={(e) => onInputChange(e)}
          className={classNames(
            {
              "p-invalid": formState.errors[field] === "",
            },
            "mt-1"
          )}
          {...formField}
        />
      );
    }

    // asterisk and error text using required options and p-error class name to show text in below error field
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
      <div>
        <Controller
          defaultValue={taskDataEditFilename}
          control={control}
          name={field}
          rules={registerOptions}
          render={renderInput}
        />
      </div>
    </div>
  );
};

export default EditCheckModalField;
