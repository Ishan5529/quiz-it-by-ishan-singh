import React from "react";

import ButtonGroup from "@bigbinary/neeto-molecules/ButtonGroup";
import classNames from "classnames";
import { InlineInput } from "components/commons";
import { LeftArrow, Link } from "neetoicons";
import { Typography } from "neetoui";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { showToastr, generateDraftInfoMessage } from "utils";

const Header = ({
  title,
  originalTitle = "",
  updatedAt,
  slug,
  handleTitleUpdate,
  handleInputBlur,
  isDraft,
  handlePublish,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleBackClick = () => {
    history.push(`/dashboard/quizzes`);
  };

  const handleLinkCopy = async () => {
    const link = `http://localhost:3000/public/quizzes/${slug}/registration`;
    await navigator.clipboard.writeText(link);
    showToastr({
      message: "Link copied to clipboard",
      type: "info",
      autoClose: 2000,
    });
  };

  const handlePreviewClick = async () => {
    const link = `/public/quizzes/${slug}/registration?isPreview=true`;
    history.push(link);
  };

  return (
    <div className="relative flex h-full w-full flex-row items-center px-4">
      <div className="flex w-[33%] flex-row items-center space-x-2">
        <div className="cursor-pointer" onClick={handleBackClick}>
          <LeftArrow />
        </div>
        <InlineInput
          allowCancel
          originalValue={originalTitle}
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
      <div className="ml-auto flex flex-row items-center space-x-4">
        {isDraft && (
          <Typography className="italic text-gray-500" style="body2">
            {generateDraftInfoMessage({ date: updatedAt })}
          </Typography>
        )}
        <div className="h-full">
          <ButtonGroup
            size="small"
            buttons={[
              {
                isActive: true,
                key: "Publish",
                label: "Publish",
                onClick: handlePublish,
              },
              {
                isActive: false,
                key: "ExternalLink",
                icon: "ri-arrow-right-up-line",
                onClick: handlePreviewClick,
              },
            ]}
          />
        </div>
        <div className="h-full cursor-pointer" onClick={handleLinkCopy}>
          <Link />
        </div>
      </div>
    </div>
  );
};

export default Header;
