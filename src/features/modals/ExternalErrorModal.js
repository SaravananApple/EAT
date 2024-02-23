import React from "react";
import ExternalAddModal from "./components/ExternalAddModal";

const ExternalErrorModal = (props) => {
  const { visible, onHide } = props;

  return (
    <div>
      <ExternalAddModal
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
    field: "define_error",
    label: "Define Error",
    type: "text",
    registerOptions: { required: "Please define the error" },
  },
  {
    field: "containment",
    label: "Containment",
    type: "text",
    registerOptions: { required: "Please fill the Containment" },
  },
  {
    field: "determine_root_cause",
    label: "Determine Root Cause",
    type: "text",
    registerOptions: { required: "Please fill the Root Cause" },
  },
  {
    field: "corrective_action",
    label: "Corrective Action",
    type: "text",
    registerOptions: { required: "Please fill the Corrective Action" },
  },

  {
    field: "preventive_action",
    label: "Preventive Action",
    type: "text",
    registerOptions: { required: "Please fill the Preventive Action" },
  },
  {
    field: "status",
    label: "status code",
    type: "dropdown",
    registerOptions: { required: "Please select status code" },
  },
  {
    field: "time_taken",
    label: "Time Taken",
    type: "time",
    registerOptions: { required: "please enter Time Taken" },
  },
  {
    field: "remarks",
    label: "Remarks",
    type: "text",
    registerOptions: { required: "please enter remarks time" },
  },
];

export default ExternalErrorModal;
