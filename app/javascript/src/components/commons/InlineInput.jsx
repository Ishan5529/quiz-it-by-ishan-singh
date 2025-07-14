import React from "react";

const InlineInput = ({ value, placeholder, onChange }) => (
  <div className="inline-input">
    <input
      className="inline-input-field"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InlineInput;
