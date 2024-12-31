import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { RoutePaths, ButtonNames } from "../types";
import { ChartNoAxesGantt, Heart, Hourglass, Info } from "lucide-react";
const Layout: React.FC = () => {
  const [activeButton, setActiveButton] = useState<ButtonNames | null>(null);
  const location = useLocation();
  useEffect(() => {
    const routeToButtonMap: Record<RoutePaths, ButtonNames> = {
      "/": "heart",
      "/timer": "hourglass",
      "/visuals": "chart",
      "/about": "info",
    };

    const activeButtonName = routeToButtonMap[location.pathname as RoutePaths];
    if (activeButtonName) {
      setActiveButton(activeButtonName);
    }
  }, [location]);

  return (
    <>
      <div className="h-screen w-screen flex sm:flex-row flex-col p-6 sm:p-0">
        {/* Left Section - adding order-2 for mobile */}
        <div className=" flex flex-row sm:flex-col justify-center items-center h-auto sm:h-full w-full sm:w-20 gap-1 order-2 sm:order-1">
          <NavLink to="/">
            <button
              className={`items-center justify-center rounded-full p-2 hover:bg-slate-800 ${
                activeButton === "heart" ? "text-red-500" : "text-gray-600"
              }`}
            >
              <Heart
                className={` transition-transform duration-100 ease-in-out ${
                  activeButton === "heart" ? "scale-110" : ""
                }`}
              />
            </button>
          </NavLink>

          <NavLink to="/timer">
            <button
              className={`items-center justify-center rounded-full p-2 hover:bg-slate-800 ${
                activeButton === "hourglass"
                  ? "text-yellow-500"
                  : "text-gray-600"
              }`}
            >
              <Hourglass
                className={`transition-transform duration-100 ease-in-out ${
                  activeButton === "hourglass" ? "scale-110" : ""
                }`}
              />
            </button>
          </NavLink>
          <NavLink to="/visuals">
          <button
            className={`items-center justify-center rounded-full p-2 hover:bg-slate-800 ${
              activeButton === "chart" ? "text-green-500" : "text-gray-600"
            }`}
          >
            <ChartNoAxesGantt
              className={` transition-transform duration-100 ease-in-out ${
                activeButton === "chart" ? "scale-110" : ""
              }`}
            />
          </button>
          </NavLink>
          <NavLink to="/about">
          <button
            className={`items-center justify-center rounded-full p-2 hover:bg-slate-800 ${
              activeButton === "info" ? "text-blue-500" : "text-gray-600"
            }`}
          >
            <Info
              className={` transition-transform duration-100 ease-in-out ${
                activeButton === "info" ? "scale-110" : ""
              }`}
            />
          </button>
          </NavLink>
        </div>
        {/* Right Section - adding order-1 for mobile */}
        <div className=" flex-1 flex justify-center items-center order-1 sm:order-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
