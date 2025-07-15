import React from "react";

import classNames from "classnames";
import { InlineInput } from "components/commons";
import { LeftArrow } from "neetoicons";
import { NavLink, useLocation } from "react-router-dom";

const Header = ({ title, slug, handleTitleUpdate, handleInputBlur }) => {
  const { pathname } = useLocation();

  const handleBackClick = () => {
    window.location.href = "/dashboard/quizzes";
  };

  return (
    <div className="relative flex h-full w-full flex-row items-center px-4">
      <div className="flex w-[33%] flex-row items-center space-x-2">
        <div className="cursor-pointer" onClick={handleBackClick}>
          <LeftArrow />
        </div>
        <InlineInput
          placeholder="Enter quiz title"
          value={title}
          onBlur={handleInputBlur}
          onChange={handleTitleUpdate}
        />
      </div>
      <div className="pointer-events-none absolute left-0 right-0 flex flex-1 justify-center">
        <div className="pointer-events-auto flex flex-row space-x-4">
          <NavLink
            to={`/dashboard/quizzes/${slug}/edit`}
            className={classNames(
              "text-base font-semibold hover:text-blue-300",
              {
                "text-gray-800": pathname.includes("edit"),
                "text-gray-400": !pathname.includes("edit"),
              }
            )}
          >
            Questions
          </NavLink>
          <NavLink
            to={`/dashboard/quizzes/${slug}/submissions`}
            className={classNames(
              "text-base font-semibold hover:text-blue-300",
              {
                "text-gray-800": pathname.includes("submissions"),
                "text-gray-400": !pathname.includes("submissions"),
              }
            )}
          >
            Submissions
          </NavLink>
        </div>
      </div>
      <div className="ml-auto flex flex-row items-center">Actions Here</div>
    </div>
  );
};

export default Header;
