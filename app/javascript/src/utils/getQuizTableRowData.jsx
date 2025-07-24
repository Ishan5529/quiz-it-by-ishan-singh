import React from "react";

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
}) =>
  quizzes.map(quiz => ({
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
        {quiz.isDraft && (
          <Tag
            disabled
            label="Draft"
            size="large"
            style="warning"
            type="outline"
          />
        )}
        {quiz.isPublished && (
          <Tag
            disabled
            label="Published"
            size="large"
            style="info"
            type="outline"
          />
        )}
      </div>
    ),
    actions: (
      <div className="flex w-full items-center justify-between">
        <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
          <Dropdown.Menu>
            <Dropdown.MenuItem.Button
              onClick={() => {
                handlePublishToggle({
                  slugs: quiz.slug,
                  publishedStatus: quiz.isPublished,
                });
              }}
            >
              {quiz.isPublished ? "Unpublish" : "Publish"}
            </Dropdown.MenuItem.Button>
            <Dropdown.MenuItem.Button
              onClick={() => handleQuizClone(quiz.slug)}
            >
              Clone
            </Dropdown.MenuItem.Button>
            <Dropdown.Divider />
            {quiz.isDraft && (
              <Dropdown.MenuItem.Button
                style="danger"
                onClick={() => {
                  setShowDiscardAlert(true);
                  setSelectedQuizSlugs([quiz.slug]);
                }}
              >
                Discard draft
              </Dropdown.MenuItem.Button>
            )}
            <Dropdown.MenuItem.Button
              style="danger"
              onClick={() => {
                setShowDeleteAlert(true);
                setSelectedQuizSlugs([quiz.slug]);
              }}
            >
              Delete
            </Dropdown.MenuItem.Button>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    ),
  }));
