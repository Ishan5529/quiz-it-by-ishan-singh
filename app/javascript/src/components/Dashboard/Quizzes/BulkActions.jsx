import React from "react";

import { Delete } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { isEmpty } from "ramda";
import withT from "utils/withT";

const BulkActions = ({
  selectedQuizSlugs,
  handlePublishToggle,
  setSelectedQuizSlugs,
  setShowDeleteAlert,
  Menu,
  MenuItem,
  t,
}) =>
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
      <Button
        disabled={!selectedQuizSlugs.length}
        icon={Delete}
        label={t("labels.delete")}
        size="small"
        style="danger"
        onClick={() => setShowDeleteAlert(true)}
      />
    </div>
  );

export default withT(BulkActions);
