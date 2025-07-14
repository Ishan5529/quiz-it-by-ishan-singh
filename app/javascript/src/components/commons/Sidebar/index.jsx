import React, { useState } from "react";

import authenticationApi from "apis/authentication";
import classNames from "classnames";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { LeftArrow } from "neetoicons";
import { NeetoQuiz } from "neetoicons/logos";
import { NavLink, useLocation, Link } from "react-router-dom";
import { routes } from "src/routes";

import { SIDENAV_LINKS, PROFILE_IMAGE_URL } from "./constants";
import Profile from "./Profile";

const SideBar = () => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { pathname, search } = useLocation();

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
              Quiz It
            </p>
          )}
        </div>
        {SIDENAV_LINKS.map(
          ({ label, to, icon: Icon, icon_size, target, sub_links }, index) => {
            const hasSubLinks = sub_links && sub_links.length > 0;
            const isOpen = openDropdownIndex === index && isSidebarExpanded;

            return (
              <div
                className="w-full"
                key={index}
                onMouseEnter={() => hasSubLinks && setOpenDropdownIndex(index)}
                onMouseLeave={() => hasSubLinks && setOpenDropdownIndex(null)}
              >
                <NavLink
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
                      <div className="flex-1">
                        <div
                          className={classNames(
                            "flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold transition-all duration-200",
                            {
                              "text-left": isSidebarExpanded,
                              "text-center": !isSidebarExpanded,
                            }
                          )}
                        >
                          {label}
                          {hasSubLinks && (
                            <span className="ml-2">
                              <svg
                                fill="currentColor"
                                height="12"
                                viewBox="0 0 20 20"
                                width="12"
                                className={classNames(
                                  "transition-transform duration-200",
                                  { "rotate-180": isOpen }
                                )}
                              >
                                <path
                                  d="M7 8l3 3 3-3"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </NavLink>
                <div
                  className={classNames(
                    "ml-12 mt-1 flex flex-col overflow-hidden py-1",
                    "transition-all duration-300",
                    { "pointer-events-none": !isOpen }
                  )}
                  style={{
                    maxHeight: isOpen ? `${sub_links?.length * 40}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {sub_links?.map((sub, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={sub.to}
                      className={classNames(
                        "mt-0.5 flex rounded px-3 py-1 text-left text-base hover:bg-gray-200 hover:text-gray-800",
                        {
                          "bg-gray-100 text-blue-400":
                            pathname + search === sub.to,
                          "bg-white text-gray-400":
                            pathname + search !== sub.to,
                        }
                      )}
                    >
                      {sub.label}
                      {sub.count !== undefined && (
                        <span className="ml-auto rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-700">
                          {sub.count}
                        </span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          }
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
