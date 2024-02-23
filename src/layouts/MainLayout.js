import React from "react";
import SideBar from "../components/sidebar/SideBar";
import AuthRouteSwitch from "../components/routes/AuthRouteSwitch";

const MainLayout = () => {
  return (
    <div>
      <div className="">
        <div className="min-h-screen flex relative lg:static ">
          <SideBar />
          <div className="min-h-screen flex flex-column relative ">
            <AuthRouteSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
