import React from "react";

import withT from "utils/withT";

import { Button, Typography } from "neetoui";
import OptionField from "./OptionField";

const Question = ({
  questionNumber = 1,
  totalQuestions = 2,
  question,
  selectedOption,
  onOptionSelect,
  onNext,
  onPrevious,
  onSubmit,
  isFirst,
  isLast,
  t,
}) => {
  const title = question?.title || "Quiz Question";
  const questionId = question?.id || "default-question-id";
  const options = question?.options || [];

  return (
    <div className="flex h-3/5 w-[75%] flex-col items-center">
      <div className="flex h-full w-full flex-col space-y-8 p-4">
        <div>
          <Typography style="h4">
            {t("labels.question")} {questionNumber} of {totalQuestions}
          </Typography>
          <Typography style="h2">{title}</Typography>
        </div>
        <div className="flex w-full flex-col items-start space-y-2">
          {options.map((option, index) => (
            <OptionField
              key={index}
              option={option}
              isSelected={selectedOption === option}
              onSelect={() => onOptionSelect(questionId, option)}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-row space-x-4">
          {!isFirst && (
            <Button
              label={t("labels.previous")}
              style="secondary"
              onClick={onPrevious}
            />
          )}
          {!isLast ? (
            <Button label={t("labels.next")} style="primary" onClick={onNext} />
          ) : (
            <Button
              label={t("labels.saveAndSubmit")}
              style="primary"
              onClick={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withT(Question);
