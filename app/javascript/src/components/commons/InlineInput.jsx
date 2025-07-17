import React from "react";

import classNames from "classnames";

const InlineInput = ({
  name,
  value,
  placeholder,
  disableHover,
  disableFocus,
  onChange = null,
  onBlur = null,
  className = "",
}) => (
  <div className="w-full">
    <input
      name={name}
      placeholder={placeholder}
      type="text"
      value={value}
      className={classNames(
        "w-full rounded-lg bg-transparent p-2 text-3xl font-semibold",
        {
          "hover:outline hover:outline-blue-500 focus:outline": !disableHover,
          "focus:outline-none": disableFocus,
        },
        className
      )}
      onBlur={onBlur}
      onChange={onChange}
    />
  </div>
);

export default InlineInput;
