import React, { useState } from "react";

import authenticationApi from "apis/authentication";
import classNames from "classnames";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { LeftArrow } from "neetoicons";
import { NeetoQuiz } from "neetoicons/logos";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { routes } from "src/routes";

import Profile from "./Profile";
import SideNavLinks from "./SideNavLinks";

const SideBar = () => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const { pathname, search } = useLocation();

  const { t } = useTranslation();

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
        className={classNames(
          "flex flex-col items-center text-white transition-all duration-300",
          isSidebarExpanded ? "w-[320px] justify-start" : "w-20 justify-center"
        )}
      >
        <div
          className={classNames(
            "mb-6 flex w-full items-center rounded-2xl bg-gray-800 p-4",
            "transition-all duration-200 hover:bg-gray-700",
            {
              "justify-start": isSidebarExpanded,
              "justify-center": !isSidebarExpanded,
            }
          )}
        >
          <NeetoQuiz />
          {isSidebarExpanded && (
            <Typography
              className="overflow-hidden text-ellipsis whitespace-nowrap text-4xl font-bold"
              style="body2"
            >
              uiz It
            </Typography>
          )}
        </div>
        <SideNavLinks
          {...{
            isSidebarExpanded,
            pathname,
            openDropdownIndex,
            search,
            setOpenDropdownIndex,
          }}
        />
      </div>
      <div
        className={classNames(
          "absolute bottom-0 left-0 z-20 mt-2 overflow-hidden bg-transparent pt-1 shadow-xl transition-all duration-300",
          isSidebarExpanded ? "w-[320px]" : "w-20"
        )}
      >
        <div className="flex flex-row items-center space-x-2 border-b-2 p-3">
          <Profile name={`${user.first_name} ${user.last_name}`} />
          {isSidebarExpanded && (
            <div className="flex flex-col">
              <Typography
                className="text-lg font-bold text-gray-800"
                style="body2"
              >{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography className="text-gray-800" style="body2">
                {user.email}
              </Typography>
            </div>
          )}
        </div>
        {isSidebarExpanded && (
          <Link
            className="block cursor-pointer px-3 py-2.5 text-base font-semibold text-gray-800 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LeftArrow className="mr-2 inline" />
            {t("authentication.logout")}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
