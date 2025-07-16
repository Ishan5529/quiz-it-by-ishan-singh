import React from "react";

import { InlineInput } from "components/commons";
import { Delete } from "neetoicons";

const OptionField = ({
  index,
  option,
  handleDelete,
  handleOptionChange,
  setCorrectOption,
  correctOption,
}) => (
  <div className="flex flex-row items-center space-x-3">
    <input
      checked={correctOption === index + 1}
      name="option-radio"
      type="radio"
      onClick={() => setCorrectOption(index + 1)}
    />
    <InlineInput
      placeholder={`Option ${index + 1}`}
      value={option}
      onChange={e => handleOptionChange(index, e.target.value)}
    />
    <div className="cursor-pointer" onClick={handleDelete}>
      <Delete />
    </div>
  </div>
);

export default OptionField;
