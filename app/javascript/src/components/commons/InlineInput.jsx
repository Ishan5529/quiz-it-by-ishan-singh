import React from "react";

const InlineInput = ({
  value,
  placeholder,
  onChange = null,
  onBlur = null,
}) => (
  <div className="w-full">
    <input
      className="w-full rounded-lg p-2 text-3xl font-semibold hover:outline hover:outline-blue-500 focus:outline"
      placeholder={placeholder}
      type="text"
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  </div>
);

export default InlineInput;
