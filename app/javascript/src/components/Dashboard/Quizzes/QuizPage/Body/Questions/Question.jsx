import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Radio } from "neetoui";

const Question = ({ question, handleMenuClick }) => {
  const options = [1, 2, 3, 4, 5, 6]
    .map(i => question[`option${i}`])
    .filter(option => option !== null);

  const handleOptionChange = () => {
    // Handle the change event for the radio buttons
  };

  return (
    <div className="question-container mb-10 w-3/4 rounded-lg border bg-white p-4">
      <Radio
        disabled
        stacked
        class="cursor-default"
        className="mt-1 space-y-4"
        labelProps={{ className: "w-full" }}
        label={
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">{question.title}</p>
            <div className="cursor-pointer" onClick={handleMenuClick}>
              <MenuHorizontal />
            </div>
          </div>
        }
      >
        {options.map((option, idx) => (
          <Radio.Item
            checked={idx + 1 === question.correct_option}
            key={idx}
            label={option}
            name={`question-${question.id}`}
            value={`option${idx + 1}`}
            onChange={handleOptionChange}
          />
        ))}
      </Radio>
    </div>
  );
};

export default Question;
