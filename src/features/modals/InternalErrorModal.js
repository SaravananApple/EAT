import React from "react";
import InternalAddModal from "./components/InternalAddModal";

const InternalErrorModal = (props) => {
  const { visible, onHide } = props;

  return (
    <div>
      <InternalAddModal
        visible={visible}
        onHide={onHide}
        fields={taskModalFields}
        title="Add Task"
        strapiCollection="tasks"
        queryInvalidateKey="client-list"
      />
    </div>
  );
};

const taskModalFields = [
  {
    field: "file_no",
    label: "File No",
    type: "number",
    registerOptions: { required: "File number is required" },
  },

  {
    field: "est",
    label: "Estimated Hours",
    type: "time",
    registerOptions: { required: "please select est date" },
  },
  {
    field: "start_date",
    label: "Start Date",
    type: "date",
    registerOptions: { required: "please select start date" },
  },
  {
    field: "end_date",
    label: "End Date",
    type: "date",
    registerOptions: { required: "please select end date" },
  },
  {
    field: "effort",
    label: "Effort",
    type: "time",
    registerOptions: { required: "please enter effort time" },
  },
  {
    field: "reviewer",
    label: "Reviewer",
    type: "dropdown",
    registerOptions: { required: "Please select reviewer code" },
  },
  {
    field: "reviewer_record",
    label: "Reviewer Record",
    type: "textArea",
    registerOptions: { required: "Please select reviewer code" },
  },

  {
    field: "status",
    label: "status code",
    type: "dropdown",
    registerOptions: { required: "Please select status code" },
  },

  {
    field: "remarks",
    label: "Remarks",
    type: "text",
    registerOptions: { required: "please enter remarks time" },
  },
];

export default InternalErrorModal;
