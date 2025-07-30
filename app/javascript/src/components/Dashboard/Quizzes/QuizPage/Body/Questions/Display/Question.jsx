import React from "react";

import {
  useQuestionsClone,
  useQuestionsDestroy,
} from "hooks/reactQuery/useQuestionsApi";
import { MenuHorizontal } from "neetoicons";
import { Typography, Radio, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";

const Question = ({ question, slug, setIsDirty }) => {
  const history = useHistory();

  const { mutate: cloneQuestion } = useQuestionsClone();
  const { mutate: destroyQuestion } = useQuestionsDestroy();

  const { t } = useTranslation();

  const options = question.options.filter(option => option !== null);

  const { Menu, MenuItem, Divider } = Dropdown;

  const handleEdit = () => {
    const link = routes.dashboard.quizzes.edit.editQuestion
      .replace(":slug", slug)
      .replace(":id", question.id);

    history.push(link);
  };

  const handleClone = async () => {
    cloneQuestion({ slug, id: question.id });
    setIsDirty(true);
  };

  const handleDelete = async () => {
    destroyQuestion({ slug, ids: [question.id] });
    setIsDirty(true);
  };

  return (
    <div className="question-container mb-10 w-3/4 rounded-lg border bg-white p-4">
      <div className="mb-4 flex w-full items-center justify-between">
        <Typography className="w-full text-gray-700" style="h3">
          {question.title}
        </Typography>
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button onClick={handleEdit}>
              {t("labels.edit")}
            </MenuItem.Button>
            <MenuItem.Button onClick={handleClone}>
              {t("labels.clone")}
            </MenuItem.Button>
            <Divider />
            <MenuItem.Button style="danger" onClick={handleDelete}>
              {t("labels.delete")}
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
