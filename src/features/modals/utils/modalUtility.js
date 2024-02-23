import React from "react";

export const getDefaultFormValues = (fields) => {
  const defaultValues = {};

  fields.forEach((options) => {
    if (
      !options.type ||
      options.type === "text" ||
      options.type === "textArea"
    ) {
      defaultValues[options.fields] = "";
    } else if (options.type === "number") {
      defaultValues[options.fields] = "";
    } else if (options.type === "boolean") {
      defaultValues[options.fields] = false;
    } else {
      defaultValues[options.fields] = null;
    }
  });

  return defaultValues;
};
