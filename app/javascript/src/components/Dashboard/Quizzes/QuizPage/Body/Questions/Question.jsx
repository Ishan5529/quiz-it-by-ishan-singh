import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Typography, Radio, Dropdown } from "neetoui";
import { useHistory } from "react-router-dom";

const Question = ({ question, slug }) => {
  const history = useHistory();

  const options = [1, 2, 3, 4, 5, 6]
    .map(i => question[`option${i}`])
    .filter(option => option !== null);

  const { Menu, MenuItem, Divider } = Dropdown;

  const handleEdit = () => {
    history.push(
      `/dashboard/quizzes/${slug}/edit/edit-question/${question.id}`
    );
  };

  const handleClone = () => {
    // Logic to handle clone action
  };

  const handleDelete = () => {
    // Logic to handle clone action
  };

  return (
    <div className="question-container mb-10 w-3/4 rounded-lg border bg-white p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <Typography className="w-full text-gray-700" style="h3">
          {question.title}
        </Typography>
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button onClick={handleEdit}>Edit</MenuItem.Button>
            <MenuItem.Button onClick={handleClone}>Clone</MenuItem.Button>
            <Divider />
            <MenuItem.Button style="danger" onClick={handleDelete}>
              Delete
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      </div>
      <Radio
        disabled
        stacked
        class="cursor-default"
        className="w-full space-y-4"
      >
        {options.map((option, idx) => (
          <Radio.Item
            checked={idx + 1 === question.correct_option}
            key={idx}
            label={<div className="w-full break-words">{option}</div>}
            labelProps={{ className: "w-[1000px]" }}
            name={`question-${question.id}`}
            value={`option${idx + 1}`}
          />
        ))}
      </Radio>
    </div>
  );
};

export default Question;
