import { useQuery } from "react-query";
import API from "./API";
import moment from "moment";

export const taskKey = {
  tasks: "tasks",
  taskId: (id) => ["/tasks", id],
};

export const errorKey = {
  errors: "errors",
  taskId: (id) => ["/errors", id],
};

export const checkKey = {
  check: "checks",
  taskId: (id) => ["/checks", id],
};

export const userKey = {
  users: "users",
  taskId: (id) => ["/users", id],
};

// function addOneDay(date) {
//   date.setDate(date.getDate() + 1);
//   return date;
// }

export const useGetTaskList = (end_point) => {
  const fetchTask = async () => {
    const { data, meta } = await API.getInformation(end_point).then((res) => {
      if (res instanceof Error) {
        return "Error";
      } else {
        return res?.data;
      }
    });

    return { data: mapTasks(data), meta };
  };

  return useQuery(taskKey.tasks, () => fetchTask(), {
    cacheTime: 500,
  });
};

const mapTasks = (data) => {
  return data.map((task) => {
    return {
      id: task.id,
      ...task.attributes,
      file_no: task.attributes.file_no,

      start_date: moment(task.attributes.start_date).add(1, "days"),
      end_date: moment(task.attributes.end_date).add(1, "days"),

      effort: task.attributes.effort,
      est: task.attributes.est,
      reviewer: task.attributes.reviewer,
      status: task.attributes.status,
    };
  });
};

export const useErrorList = (end_point) => {
  const fetchError = async () => {
    const { data, meta } = await API.getInformation(end_point).then((res) => {
      if (res instanceof Error) {
        return "Error";
      } else {
        return res?.data;
      }
    });

    return { data: mapError(data), meta };
  };

  return useQuery(errorKey.errors, () => fetchError(), {
    cacheTime: 500,
  });
};

const mapError = (data) => {
  return data.map((task) => {
    return {
      id: task.id,
      ...task.attributes,
      file_no: task.attributes.file_no,
      pick_date: task.attributes.pick_date,
      completed_date: task.attributes.completed_date,
      define_error: task.attributes.define_error,
      containment: task.attributes.containment,
      determine_root_cause: task.attributes.determine_root_cause,
      corrective_action: task.attributes.corrective_action,
      preventive_action: task.attributes.preventive_action,
      status: task.attributes.status,
      time_taken: task.attributes.time_taken,
      remarks: task.attributes.remarks,
    };
  });
};

export const useEmployeeDetails = (end_point) => {
  const fetchEmployeeDetails = async () => {
    const { data, meta } = await API.getInformation(end_point).then((res) => {
      if (res instanceof Error) {
        return "Error";
      } else {
        return res.data;
      }
    });

    return { data: mapEmployeeDetails(data), meta };
  };

  return useQuery(userKey.users, () => fetchEmployeeDetails(), {
    cacheTime: 500,
  });
};

const mapEmployeeDetails = (data) => {
  return data.map((task) => {
    return {
      employee_id: task.employee_id,
      employee_full_name: task.employee_full_name,
    };
  });
};

export const useGetCheckList = (end_point) => {
  const fetchTask = async () => {
    const { data, meta } = await API.getInformation(end_point).then((res) => {
      if (res instanceof Error) {
        return "Error";
      } else {
        return res?.data;
      }
    });

    return { data: mapTasks(data), meta };
  };

  return useQuery(checkKey.check, () => fetchTask(), {
    cacheTime: 500,
  });
};

const mapCheck = (data) => {
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
