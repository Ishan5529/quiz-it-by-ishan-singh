import React from "react";

import classNames from "classnames";
import { useQuizzesFetch } from "hooks/reactQuery/useQuizzesApi";
import { NavLink } from "react-router-dom";

import { SIDENAV_LINKS } from "./constants";

const SideNavLinks = ({
  isSidebarExpanded,
  pathname,
  openDropdownIndex,
  setOpenDropdownIndex,
  search,
}) => {
  const { data: { data: { meta } = {} } = {} } = useQuizzesFetch();

  SIDENAV_LINKS[0].sub_links.forEach(sublink => {
    if (sublink.label === "All") {
      sublink.count = meta?.total_count || 0;
    } else if (sublink.label === "Published") {
      sublink.count = meta?.published_count || 0;
    } else if (sublink.label === "Draft") {
      sublink.count = meta?.draft_count || 0;
    }
  });

  return SIDENAV_LINKS.map(
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
                    "bg-gray-100 text-blue-400": pathname + search === sub.to,
                    "bg-white text-gray-400": pathname + search !== sub.to,
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
  );
};

export default SideNavLinks;
