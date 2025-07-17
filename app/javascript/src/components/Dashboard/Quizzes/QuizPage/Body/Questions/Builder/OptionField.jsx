import React from "react";

import classNames from "classnames";
import { InlineInput } from "components/commons";
import { Delete } from "neetoicons";
import { Button } from "neetoui";

const OptionField = ({
  index,
  option,
  handleDelete,
  handleOptionChange,
  isDeleteDisabled = false,
  minimumOptions,
}) => (
  <div className="flex w-full flex-row items-center space-x-3">
    <InlineInput
      disableFocus
      disableHover
      className="text-xl"
      placeholder={`Option ${index + 1}`}
      value={option}
      onChange={({ target }) => handleOptionChange(index, target.value)}
    />
    <Button
      style="danger-text"
      className={classNames({
        "cursor-not-allowed opacity-50": isDeleteDisabled,
      })}
      tooltipProps={{
        content: isDeleteDisabled
          ? `Minimum ${minimumOptions} options required`
          : "Delete option",
        position: "top",
      }}
      onClick={handleDelete}
    >
      <Delete />
    </Button>
  </div>
);

export default OptionField;
