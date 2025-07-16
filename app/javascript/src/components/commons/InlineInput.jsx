import React from "react";

import classNames from "classnames";

const InlineInput = ({
  value,
  placeholder,
  disableHover,
  onChange = null,
  onBlur = null,
}) => (
  <div className="w-full">
    <input
      placeholder={placeholder}
      type="text"
      value={value}
      className={classNames(
        "w-full rounded-lg bg-transparent p-2 text-3xl font-semibold",
        {
          "hover:outline hover:outline-blue-500 focus:outline": !disableHover,
        }
      )}
      onBlur={onBlur}
      onChange={onChange}
    />
  </div>
);

export default InlineInput;
