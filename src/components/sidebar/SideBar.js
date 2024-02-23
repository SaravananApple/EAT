import { Button } from "primereact/button";
import { SidebarData } from "../../data/Data.js";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Ripple } from "primereact/ripple";

export default function Component() {
  const [selected, setSelected] = useState(0);

  const logoutHandle = () => {
    localStorage.removeItem("jwt");
    window.location.reload("http://localhost:3000/Login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-blue-800 text-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-4xl font-semibold">EAT</span>
          <AutoGraphIcon className="text-white" />
          {/* <img
            className="border-round"
            src="/assets/actalent_logo.png"
            alt="Athena by Actalent"
            style={{ width: "80px" }}
          /> */}
        </div>
        {SidebarData.map((item, index) => {
          return (
            <>
              <div>
                <nav className="mt-5 ">
                  <NavLink
                    className=" p-ripple flex flex-row items-center px-4 py-2 text-sm hover:bg-gray-700 text-white no-underline transition-duration-150 transition-colors"
                    to={item.path}
                  >
                    <item.icon className="mr-3" />
                    <span>{item.heading}</span>
                  </NavLink>
                  <Ripple />
                </nav>
              </div>
            </>
          );
        })}

        <div>
          <Button
            className="flex items-center px-4 py-2 text-xl hover:bg-gray-700 mt-7 w-9 ml-4"
            label="Logout"
            severity="danger"
            size="small"
            onClick={logoutHandle}
          />
        </div>
      </aside>
      {/* <main className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center space-x-2">
          <AuthRouteSwitch />
        </div>
      </main> */}
    </div>
  );
}
