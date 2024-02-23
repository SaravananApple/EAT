import React from "react";
import { Routes, Route } from "react-router-dom";
import "../routes/Routers.css";

const DashBoard = React.lazy(() =>
  import("../maindash/maincomponent/DashBoard")
);

const AddtaskList = React.lazy(() =>
  import("../maindash/maincomponent/AddTaskList")
);

const InternalErrors = React.lazy(() =>
  import("../maindash/maincomponent/InternalErrors")
);

const Analytics = React.lazy(() =>
  import("../maindash/maincomponent/Analytics")
);

const Resource = React.lazy(() => import("../maindash/maincomponent/Resource"));

const CheckList = React.lazy(() =>
  import("../maindash/maincomponent/CheckList")
);

const ExternalErrors = React.lazy(() =>
  import("../maindash/maincomponent/ExternalErrors")
);

const TaskHistory = React.lazy(() =>
  import("../maindash/maincomponent/TaskHistory")
);

const OrganisationPolicy = React.lazy(() =>
  import("../maindash/maincomponent/OrganisationPolicy")
);

const Routers = () => {
  return (
    <div>
      <>
        <div>
          <div>
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto">
                      <DashBoard />
                    </div>
                  }
                />
                <Route
                  path="/add-task"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <AddtaskList />
                    </div>
                  }
                />
                <Route
                  path="/task-history"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <TaskHistory />
                    </div>
                  }
                />
                <Route
                  path="/internal-error"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <InternalErrors />
                    </div>
                  }
                />
                <Route
                  path="/external-error"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <ExternalErrors />
                    </div>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto">
                      <Analytics />
                    </div>
                  }
                />
                <Route
                  path="/resource"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto">
                      <Resource />
                    </div>
                  }
                />
                <Route
                  path="/tutorial"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <CheckList />
                    </div>
                  }
                />
                <Route
                  path="/organisation-policy"
                  element={
                    <div className="page-wrapper flex flex-column flex-auto ml-5">
                      <OrganisationPolicy />
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Routers;
