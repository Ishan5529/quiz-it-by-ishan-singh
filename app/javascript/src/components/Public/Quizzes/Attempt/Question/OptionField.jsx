import React from "react";
import classNames from "classnames";

const OptionField = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={classNames("w-full cursor-pointer rounded-lg border p-4", {
        "border-blue-500 bg-blue-100": isSelected,
        "border-gray-300 bg-white": !isSelected,
      })}
      onClick={() => onSelect(option)}
    >
      <span>{option}</span>
    </div>
  );
};

export default OptionField;
