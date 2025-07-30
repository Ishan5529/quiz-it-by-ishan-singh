import React, { useState } from "react";

import { CATEGORIES } from "components/Dashboard/Quizzes/constants";
import { Delete, RemoveCircle, Search } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { isEmpty } from "ramda";
import withT from "utils/withT";

const BulkActions = ({
  selectedQuizSlugs,
  handlePublishToggle,
  handleCategoryToggle,
  setSelectedQuizSlugs,
  setShowDeleteAlert,
  Menu,
  MenuItem,
  t,
}) => {
  const [categorySearch, setCategorySearch] = useState("");

  const filteredCategories = CATEGORIES.filter(category =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    !isEmpty(selectedQuizSlugs) && (
      <div className="flex flex-row items-center space-x-2">
        <Dropdown
          buttonStyle="secondary"
          label={t("labels.changeStatus")}
          strategy="fixed"
        >
          <Menu>
            <MenuItem.Button
              onClick={() => {
                handlePublishToggle({
                  slugs: selectedQuizSlugs,
                  publishedStatus: true,
                });
                setSelectedQuizSlugs([]);
              }}
            >
              {t("labels.draft")}
            </MenuItem.Button>
            <MenuItem.Button
              onClick={() => {
                handlePublishToggle({
                  slugs: selectedQuizSlugs,
                  publishedStatus: false,
                });
                setSelectedQuizSlugs([]);
              }}
            >
              {t("labels.publish")}
            </MenuItem.Button>
          </Menu>
        </Dropdown>
        <Dropdown
          buttonStyle="secondary"
          label={t("labels.changeCategory")}
          strategy="fixed"
        >
          <div className="px-2 py-2">
            <Input
              className="px-2 pb-1 pt-2"
              placeholder={t("placeholders.searchCategory")}
              size="small"
              suffix={<Search />}
              value={categorySearch}
              onChange={({ target }) => setCategorySearch(target.value)}
              onClick={event => event.stopPropagation()}
            />
            <Menu>
              {filteredCategories.map(category => (
                <MenuItem.Button
                  key={category}
                  onClick={() => {
                    handleCategoryToggle({
                      slugs: selectedQuizSlugs,
                      category,
                    });
                    setSelectedQuizSlugs([]);
                  }}
                >
                  {category}
                </MenuItem.Button>
              ))}
            </Menu>
          </div>
        </Dropdown>
        <Button
          disabled={!selectedQuizSlugs.length}
          icon={Delete}
          label={t("labels.delete")}
          size="small"
          style="danger"
          onClick={() => setShowDeleteAlert(true)}
        />
        <Button
          disabled={!selectedQuizSlugs.length}
          icon={RemoveCircle}
          label={t("labels.clearSelection")}
          size="small"
          style="tertiary"
          onClick={() => setSelectedQuizSlugs([])}
        />
      </div>
    )
  );
};

export default withT(BulkActions);
