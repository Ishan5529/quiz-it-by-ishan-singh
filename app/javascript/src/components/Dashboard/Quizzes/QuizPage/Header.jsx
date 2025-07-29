import React from "react";

import ButtonGroup from "@bigbinary/neeto-molecules/ButtonGroup";
import classNames from "classnames";
import { InlineInput } from "components/commons";
import { LeftArrow, Link } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { routes } from "routes";
import { showToastr, generateDraftInfoMessage, getQuizAttemptUrl } from "utils";

const Header = ({
  title,
  originalTitle = "",
  updatedAt,
  slug,
  handleTitleUpdate,
  handleInputBlur,
  isDraft,
  isPublished = false,
  handlePublish,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const { t } = useTranslation();

  const handleBackClick = () => {
    const link = routes.dashboard.quizzes.index;
    history.push(link);
  };

  const handleLinkCopy = async () => {
    const link = getQuizAttemptUrl(slug);
    await navigator.clipboard.writeText(link);
    showToastr({
      message: t("misc.linkCopied"),
      type: "info",
      autoClose: 2000,
    });
  };

  const handlePreviewClick = async () => {
    const link = `${routes.public.quizzes.registration.replace(
      ":slug",
      slug
    )}?isPreview=true`;
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
          placeholder={t("placeholders.quizTitle")}
          value={title}
          onBlur={handleInputBlur}
          onChange={handleTitleUpdate}
        />
      </div>
      <div className="pointer-events-none absolute left-0 right-0 flex flex-1 justify-center">
        <div className="pointer-events-auto flex flex-row space-x-4">
          <NavLink
            to={routes.dashboard.quizzes.edit.index.replace(":slug", slug)}
            className={classNames(
              "text-base font-semibold hover:text-blue-300",
              {
                "text-gray-800": pathname.includes("edit"),
                "text-gray-400": !pathname.includes("edit"),
              }
            )}
          >
            {t("quizzes.questions.plural")}
          </NavLink>
          <NavLink
            to={routes.dashboard.quizzes.submissions.replace(":slug", slug)}
            className={classNames(
              "text-base font-semibold hover:text-blue-300",
              {
                "text-gray-800": pathname.includes("submissions"),
                "text-gray-400": !pathname.includes("submissions"),
              }
            )}
          >
            {t("quizzes.submissions")}
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
                disabled: !isDraft,
                isActive: true,
                key: "Publish",
                label: t("labels.publish"),
                tooltipProps: {
                  content: t("tooltip.publishQuiz"),
                  position: "bottom",
                },
                onClick: handlePublish,
              },
              {
                disabled: !isPublished,
                isActive: false,
                key: "ExternalLink",
                icon: "ri-arrow-right-up-line",
                tooltipProps: {
                  content: t("tooltip.openPreview"),
                  position: "bottom",
                },
                onClick: handlePreviewClick,
              },
            ]}
          />
        </div>
        <Button
          className="text-black hover:text-blue-500"
          disabled={!isPublished}
          icon={Link}
          style="link"
          tooltipProps={{
            content: t("tooltip.copyLink"),
            position: "bottom",
          }}
          onClick={handleLinkCopy}
        />
      </div>
    </div>
  );
};

export default Header;
