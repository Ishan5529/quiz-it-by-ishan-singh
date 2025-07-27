import React from "react";

import {
  STATUS_TAGS,
  getQuizMenuItems,
} from "components/Dashboard/Quizzes/constants";
import { MenuHorizontal } from "neetoicons";
import { Tag, Dropdown } from "neetoui";
import { formatTableDate } from "utils";

export const getQuizTableRowData = ({
  quizzes,
  handleTitleClick,
  handlePublishToggle,
  handleQuizClone,
  setShowDiscardAlert,
  setShowDeleteAlert,
  setSelectedQuizSlugs,
}) => {
  const getMenuItems = getQuizMenuItems({
    handlePublishToggle,
    handleQuizClone,
    setShowDiscardAlert,
    setShowDeleteAlert,
    setSelectedQuizSlugs,
  });

  return quizzes.map(quiz => ({
    ...quiz,
    created_at: formatTableDate(quiz.created_at),
    category: quiz.category.name,
    submissions_count: quiz.submission_count,
    title: (
      <div className="cursor-pointer" onClick={handleTitleClick(quiz.slug)}>
        {quiz.title}
      </div>
    ),
    status: (
      <div className="flex flex-row items-center space-x-2">
        {Object.values(STATUS_TAGS)
          .filter(tag => tag.condition(quiz))
          .map((tag, index) => (
            <Tag
              disabled
              key={index}
              label={tag.label}
              size="large"
              style={tag.style}
              type="outline"
            />
          ))}
      </div>
    ),
    actions: (
      <div className="flex w-full items-center justify-between">
        <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
          <Dropdown.Menu>
            {getMenuItems(quiz).map((item, index) =>
              item.type === "divider" ? (
                <Dropdown.Divider key={`divider-${index}`} />
              ) : (
                <Dropdown.MenuItem.Button
                  key={index}
                  style={item.style}
                  onClick={item.onClick}
                >
                  {item.label}
                </Dropdown.MenuItem.Button>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ),
  }));
};
