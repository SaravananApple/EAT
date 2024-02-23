import React from "react";
import CheckModal from "./components/CheckModal";

const AddCheckModal = (props) => {
  const { visible, onHide } = props;

  return (
    <div>
      <CheckModal
        visible={visible}
        onHide={onHide}
        fields={taskModalFields}
        title="Add CheckPoint"
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
    field: "check_responsiveness",
    label: "Check responsiveness",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "validate_html_css",
    label: "Validate Html/CSS",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "optimize_scripts",
    label: "Optimize scripts",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "optimize_images",
    label: "Optimize images",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "optimize_css",
    label: "Optimize CSS",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "upload_favicon",
    label: "Upload favicon",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
  {
    field: "check_paragraph_styles",
    label: "Check paragraph styles",
    type: "dropdown",
    registerOptions: { required: "Please select the check point" },
  },
];

export default AddCheckModal;
