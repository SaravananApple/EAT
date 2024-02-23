import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";

const InternalErrorEditModalField = (props) => {
  const {
    field,
    label,
    registerOptions,
    taskDataEdit,
    type,
    control,
    taskDataEditFilename,
  } = props;

  const status = [
    {
      status: "WIP",
    },
    {
      status: "Delivery",
    },
    {
      status: "Completed",
    },
    {
      status: "Rework",
    },
  ];

  const reviewer = [
    {
      reviewer: "PL-1",
    },
    {
      reviewer: "PL-2",
    },
    {
      reviewer: "PL-3",
    },
    {
      reviewer: "PL-4",
    },
  ];

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

    if (formField.name === "start_date") {
      input = (
        <Calendar
          id={field}
          onChange={onCalendarChange}
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

    if (formField.name === "end_date") {
      input = (
        <Calendar
          id={field}
          onChange={onCalendarChange}
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

    if (formField.name === "status") {
      const statusCode = status;
      input = (
        <Dropdown
          editable
          id={field}
          options={statusCode}
          optionLabel="status"
          onChange={(e) => onInputChange(e)}
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
    if (formField.name === "reviewer") {
      const reviewerData = reviewer;
      input = (
        <Dropdown
          editable
          id={field}
          options={reviewerData}
          optionLabel="reviewer"
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

    if (formField.name === "est") {
      input = (
        <InputText
          id={field}
          onChange={onCalendarChange}
          timeOnly
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

    if (formField.name === "effort") {
      input = (
        <InputText
          type="number"
          id={field}
          onChange={onCalendarChange}
          timeOnly
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

    if (formField.name === "remarks") {
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

    if (formField.name === "reviewer_record") {
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

export default InternalErrorEditModalField;
