import React from "react";

import { Delete } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import { isEmpty } from "ramda";

const BulkActions = ({
  selectedQuizSlugs,
  handlePublishToggle,
  setSelectedQuizSlugs,
  setShowDeleteAlert,
  Menu,
  MenuItem,
}) =>
  !isEmpty(selectedQuizSlugs) && (
    <div className="flex flex-row items-center space-x-2">
      <Dropdown buttonStyle="secondary" label="Change Status" strategy="fixed">
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
            Draft
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
            Publish
          </MenuItem.Button>
        </Menu>
      </Dropdown>
      <Button
        disabled={!selectedQuizSlugs.length}
        icon={Delete}
        label="Delete"
        size="small"
        style="danger"
        onClick={() => setShowDeleteAlert(true)}
      />
    </div>
  );

export default BulkActions;
