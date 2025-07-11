import React, { useState } from "react";

import authenticationApi from "apis/authentication";
import classNames from "classnames";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { LeftArrow } from "neetoicons";
import { NeetoQuiz } from "neetoicons/logos";
import { NavLink, useLocation, Link } from "react-router-dom";
import { routes } from "src/routes";

import { SIDENAV_LINKS } from "./constants";
import Profile from "./Profile";

const SideBar = () => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();
  const PROFILE_IMAGE_URL =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.auth.public;
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div
      className="relative flex h-full flex-col items-center justify-between border-2 py-6 text-white shadow-sm"
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => setIsSidebarExpanded(false)}
    >
      <div
        className="flex flex-col items-center text-white"
        style={{
          width: isSidebarExpanded ? "320px" : "80px",
          justifyItems: isSidebarExpanded ? "flex-start" : "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div
          className={classNames(
            "mb-6 flex w-full items-center space-x-4 rounded-xl bg-gray-800 p-2",
            "transition-all duration-200 hover:bg-gray-700",
            {
              "justify-start": isSidebarExpanded,
              "justify-center": !isSidebarExpanded,
            }
          )}
        >
          <NeetoQuiz />
          {isSidebarExpanded && (
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">
              Quiz IT
            </p>
          )}
        </div>
        {SIDENAV_LINKS.map(
          ({ label, to, icon: Icon, icon_size, target }, index) => (
            <NavLink
              key={index}
              target={target}
              to={to}
              className={classNames(
                "mb-2 w-full items-center rounded-lg transition-all duration-200",
                "hover:text-gray-600",
                {
                  "text-blue-400": pathname === to,
                  "text-gray-400": pathname !== to,
                }
              )}
            >
              <div
                className={classNames(
                  "flex w-full items-center space-x-6 px-3 py-2.5",
                  "transition-all duration-200 hover:bg-gray-100",
                  {
                    "justify-start": isSidebarExpanded,
                    "justify-center": !isSidebarExpanded,
                  }
                )}
              >
                <Icon size={icon_size} />
                {isSidebarExpanded && (
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
                    {label}
                  </div>
                )}
              </div>
            </NavLink>
          )
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 z-20 mt-2 overflow-hidden bg-transparent pt-1 shadow-xl"
        style={{
          width: isSidebarExpanded ? "320px" : "80px",
          transition:
            "width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="flex flex-row items-center space-x-2 border-b-2 p-3">
          <Profile profile_img_url={PROFILE_IMAGE_URL} />
          {isSidebarExpanded && (
            <div className="flex flex-col">
              <p className="text-lg font-bold text-gray-800">{`${user.first_name} ${user.last_name}`}</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          )}
        </div>
        {isSidebarExpanded && (
          <Link
            className="block cursor-pointer px-3 py-2.5 text-base font-semibold text-gray-800 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LeftArrow className="mr-2 inline" />
            Log out
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
