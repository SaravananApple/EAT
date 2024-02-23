import { useContext, useState } from "react";
import "../../../components/maindash/maincomponent/DashBoard.css";
import { useGetTaskList } from "../../../utils/AddTaskServices";
import UserContext from "../../../context/UserContext.tsx";
import React from "react";
import moment from "moment";
import {
  useFetchExternalErrorList,
  useFetchInternalErrorList,
} from "../../../service/TaskListsService.js";
import qs from "qs";
import Header from "../../layout/Header/Header.js";
import ReactSpeedometer from "react-d3-speedometer";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

const DashBoard = () => {
  const [weekTask, SetWeekTask] = useState(false);

  const queryParams = qs.stringify(
    {
      populate: {
        role: { populate: "*" },
        tasks: "*",
      },
    },
    { encodeValuesOnly: true }
  );

  // Task Data
  const { data: taskData } = useGetTaskList("http://localhost:1337/api/tasks");

  const taskEffort = [];
  const dateToday = [];

  taskData?.data.map((item) => {
    taskEffort.push(parseFloat(item.effort));
    dateToday.push(moment(item.start_date).local().format("MM-DD-YYYY"));
  });

  //-------------------------------------------------------------------------------------------------

  var startOfWeek = moment().startOf("isoWeek");
  var endOfWeek = moment().endOf("isoWeek");

  var weekOfDays = [];
  var day = startOfWeek;

  while (day <= endOfWeek) {
    weekOfDays.push(day.format("MM-DD-YYYY"));
    day = day.clone().add(1, "days");
  }

  const finarrayTask = [];

  dateToday.forEach((e1) =>
    weekOfDays.forEach((e2) => {
      if (e1 == e2) {
        finarrayTask.push(e2);
      }
    })
  );

  const weekEffort = [];

  taskData?.data.map((item) => {
    const startDate = moment(item.start_date).local().format("MM-DD-YYYY");

    finarrayTask.map((options) => {
      if (options == startDate) {
        weekEffort.push(parseFloat(item.effort));
      }
    });
  });

  //----------------------------------------------------------------

  let sumOfWeekTask = 0;

  weekEffort.forEach((value) => {
    const float = value;

    sumOfWeekTask += float;
  });

  //----------------------------------------------------------------

  //------------------------------------------------------------------------------------------

  let sumOfTask = 0;

  taskEffort.forEach((value) => {
    const float = value;

    sumOfTask += float;
  });

  const summaryTask = sumOfTask;

  //----------------------------------------------------------------

  // Internal Error Data

  const { data: internalError } = useFetchInternalErrorList();

  let sumOfInternal = 0;

  const internalEffort = [];
  const internalDayEffort = [];

  internalError?.data.map((item) => {
    internalEffort.push(parseFloat(item.effort));
    internalDayEffort.push(
      moment(item.start_date).local().format("MM-DD-YYYY")
    );
  });

  const finarrayInternal = [];

  internalDayEffort.forEach((e1) =>
    weekOfDays.forEach((e2) => {
      if (e1 == e2) {
        finarrayInternal.push(e2);
      }
    })
  );

  const weekInternalEffort = [];

  internalError?.data.map((item) => {
    const startDate = moment(item.start_date).local().format("MM-DD-YYYY");

    finarrayInternal.map((options) => {
      if (options == startDate) {
        weekInternalEffort.push(parseFloat(item.effort));
      }
    });
  });

  internalEffort.forEach((value) => {
    const float = value;

    sumOfInternal += float;
  });

  const summaryInternalError = sumOfInternal;

  //----------------------------------------------------------------

  let sumOfWeekInternalError = 0;

  weekInternalEffort.forEach((value) => {
    const float = value;

    sumOfWeekInternalError += float;
  });

  //----------------------------------------------------------------

  //----------------------------------------------------------------

  // External Error Data

  const { data: externalError } = useFetchExternalErrorList();

  const externalEffort = [];

  externalError?.data.map((item) => {
    externalEffort.push(parseFloat(item.effort));
    dateToday.push(moment(item.start_date).local().format("MM-DD-YYYY"));
  });
  let sumOfExternal = 0;

  externalEffort.forEach((value) => {
    console.log("valuesData", value);
    const float = value;

    sumOfExternal += float;
  });

  //-----------------------------------------------------------------------------------------

  const finarrayExternal = [];
  const externalDayEffort = [];

  externalDayEffort.forEach((e1) =>
    weekOfDays.forEach((e2) => {
      if (e1 == e2) {
        finarrayExternal.push(e2);
      }
    })
  );

  const weekExternalEffort = [];

  externalError?.data.map((item) => {
    const startDate = moment(item.start_date).local().format("MM-DD-YYYY");

    finarrayExternal.map((options) => {
      if (options == startDate) {
        weekExternalEffort.push(parseFloat(item.effort));
      }
    });
  });

  let sumOfWeekExternalError = 0;

  weekExternalEffort.forEach((value) => {
    const float = value;

    sumOfWeekExternalError += float;
  });

  console.log("sumOfWeekExternalError", sumOfWeekExternalError);

  //----------------------------------------------------------------

  // weekExternalEffort.forEach((value) => {
  //   const float = value;

  //   sumOfWeekExternalError += float;
  // });

  //------------------------------------------------------------------------------------------------

  const totalEffort = sumOfTask + sumOfInternal + sumOfExternal;

  console.log("sumOfExternal", sumOfExternal);

  //--------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------

  const totalWeekEffort =
    sumOfWeekTask + sumOfWeekInternalError + sumOfWeekExternalError;

  //--------------------------------------------------------------------------------------

  const user = useContext(UserContext).user;
  const employee_full_name = user.employee_full_name;
  const employee_id = user.employee_id;

  const estimateFoot = () => {
    return (
      <div className="text-center p-3 text-xl font-bold">
        <p>HOURS</p>
      </div>
    );
  };

  const taskHead = () => {
    return (
      <div className="text-center p-3 text-xl font-bold">
        <p>ACTUAL TASK EFFORT</p>
      </div>
    );
  };

  const internalHead = () => {
    return (
      <div className="text-center p-3 text-xl font-bold">
        <p>INTERNAL TASK EFFORT</p>
      </div>
    );
  };

  const externalHead = () => {
    return (
      <div className="text-center p-3 text-xl font-bold">
        <p>EXTERNAL TASK EFFORT</p>
      </div>
    );
  };

  const totalHead = () => {
    return (
      <div className="text-center p-3 text-xl font-bold">
        <p>TOTAL TASK EFFORT</p>
      </div>
    );
  };
  const [selectedCity, setSelectedCity] = useState(null);
  const timelines = [{ name: "TODAY" }, { name: "WEEK" }, { name: "YEAR" }];

  return (
    <>
      <div>
        <Header
          pageTitle={"Welcome to EAT" + " " + "," + user.employee_full_name}
        />

        <div>
          <div className="">
            <Card
              title="Report Dashboard"
              className="ml-3 surface-card shadow-7 border-round mr-3"
            >
              <div className="flex  float-end">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => {
                    if (e.value.name == "WEEK") {
                      SetWeekTask(true);
                    } else if (e.value.name == "TODAY") {
                      SetWeekTask(false);
                    }
                    setSelectedCity(e.value);
                  }}
                  options={timelines}
                  optionLabel="name"
                  placeholder="Select a Timeline"
                  className="w-full md:w-14rem flex mb-32"
                />
              </div>
              <div className="flex gap-8 mt-3">
                <Card
                  title={weekTask ? sumOfWeekTask : sumOfTask}
                  header={taskHead}
                  footer={estimateFoot}
                  className="ml-3 text-center font-bold text-2xl"
                />
                <Card
                  title={weekTask ? sumOfWeekInternalError : sumOfInternal}
                  header={internalHead}
                  footer={estimateFoot}
                  className="ml-3 text-center font-bold text-2xl"
                />
                <Card
                  title={weekTask ? sumOfWeekExternalError : sumOfExternal}
                  header={externalHead}
                  footer={estimateFoot}
                  className="ml-3 text-center font-bold text-2xl"
                />
                <Card
                  title={weekTask ? totalWeekEffort : totalEffort}
                  header={totalHead}
                  footer={estimateFoot}
                  className="ml-3 text-center font-bold text-2xl"
                />
              </div>
            </Card>
          </div>
          <div className="mt-3">
            <Card
              title="Project Metrics"
              className="ml-3 surface-card shadow-7 border-round mr-3 "
            >
              <div className="flex float-end">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={timelines}
                  optionLabel="name"
                  placeholder="Select a Timeline"
                  className="w-full md:w-14rem flex mb-32"
                />
              </div>

              <div className="flex gap-8 ">
                <p className="font-bold text-lg ">FTR</p>
                <ReactSpeedometer
                  maxValue={100}
                  value={30}
                  needleColor="red"
                  startColor="green"
                  segments={10}
                  endColor="blue"
                />
                <p className="font-bold text-lg ">OTD</p>
                <ReactSpeedometer
                  maxValue={100}
                  value={80}
                  needleColor="red"
                  startColor="green"
                  segments={10}
                  endColor="blue"
                />
                <p className="font-bold text-lg ">EV</p>
                <ReactSpeedometer
                  maxValue={100}
                  value={60}
                  needleColor="red"
                  startColor="green"
                  segments={10}
                  endColor="blue"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
