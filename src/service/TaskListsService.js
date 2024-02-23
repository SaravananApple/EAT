import { useQuery } from "react-query";
import API from "../utils/API";
import moment from "moment";

const fetchTaskLists = async () => {
  const { data, meta } = await API.getInformation(
    "http://localhost:1337/api/tasks"
  ).then((res) => {
    if (res instanceof Error) {
      return "Error";
    } else {
      return res.data;
    }
  });

  return { data: mapClients(data) };
};

const mapClients = (data) => {
  return data.map((task) => {
    return {
      id: task.id,
      ...task.attributes,
      file_no: task.attributes.file_no,
      status: task.attributes.status,
      pick_date: task.attributes.pick_date,
      completed_date: task.attributes.completed_date,
      pick_time: task.attributes.pick_time,
      idle_time: task.attributes.idle_time,
      completed_time: task.attributes.completed_time,
    };
  });
};

export const useFetchtaskList = () => {
  return useQuery("tasks", fetchTaskLists);
};

const fetchInternalErrorLists = async () => {
  const { data, meta } = await API.getInformation(
    "http://localhost:1337/api/internal-errors"
  ).then((res) => {
    if (res instanceof Error) {
      return "Error";
    } else {
      return res.data;
    }
  });

  return { data: mapInternalError(data) };
};

const mapInternalError = (data) => {
  return data.map((task) => {
    return {
      id: task.id,
      ...task.attributes,
      file_no: task.attributes.file_no,
      start_date: moment(task.attributes.start_date).add(1, "days"),
      end_date: moment(task.attributes.end_date).add(1, "days"),
      define_error: task.attributes.define_error,
      containment: task.attributes.containment,
      determine_root_cause: task.attributes.determine_root_cause,
      corrective_action: task.attributes.corrective_action,
      preventive_action: task.attributes.preventive_action,
      status: task.attributes.status,
      time_taken: task.attributes.time_taken,
      remarks: task.attributes.remarks,
      reviewer_record: task.attributes.reviewer_record,
    };
  });
};

export const useFetchInternalErrorList = () => {
  return useQuery("internal", fetchInternalErrorLists);
};

const fetchExternalErrorLists = async () => {
  const { data, meta } = await API.getInformation(
    "http://localhost:1337/api/external-errors"
  ).then((res) => {
    if (res instanceof Error) {
      return "Error";
    } else {
      return res.data;
    }
  });

  return { data: mapExternalError(data) };
};

const mapExternalError = (data) => {
  return data.map((task) => {
    return {
      id: task.id,
      ...task.attributes,
      file_no: task.attributes.file_no,
      start_date: moment(task.attributes.start_date).add(1, "days"),
      end_date: moment(task.attributes.end_date).add(1, "days"),
      define_error: task.attributes.define_error,
      containment: task.attributes.containment,
      determine_root_cause: task.attributes.determine_root_cause,
      corrective_action: task.attributes.corrective_action,
      preventive_action: task.attributes.preventive_action,
      status: task.attributes.status,
      time_taken: task.attributes.time_taken,
      remarks: task.attributes.remarks,
      reviewer_record: task.attributes.reviewer_record,
    };
  });
};

export const useFetchExternalErrorList = () => {
  return useQuery("external", fetchExternalErrorLists);
};
