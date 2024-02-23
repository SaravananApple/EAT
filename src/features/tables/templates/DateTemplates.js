import moment from "moment";
import dateFormat from "dateformat";

export const dateBodyTemplate = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return moment(rowData[options.field]).local().format("MM-DD-YYYY");
  }
};

export const pickTimeBodyFilter = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return dateFormat(rowData[options.field], "HH:MM:ss TT");
  }
};

export const completeTimeBodyFilter = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return dateFormat(rowData[options.field], "HH:MM:ss TT");
  }
};

export const idleTimeBodyFilter = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return dateFormat(rowData[options.field], "HH:MM:ss TT");
  }
};

export const estTimeBodyFilter = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return dateFormat(rowData[options.field], "HH:MM");
  }
};

export const effortTimeBodyFilter = (rowData, options) => {
  if (
    rowData[options.field] === undefined ||
    rowData[options.field] === null ||
    rowData[options.field] === ""
  ) {
    return null;
  } else {
    return dateFormat(rowData[options.field], "HH:MM");
  }
};
