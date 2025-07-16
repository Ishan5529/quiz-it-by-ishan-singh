import React, { useState } from "react";

import questionsApi from "apis/questions";
import { InlineInput } from "components/commons";
import { Right } from "neetoicons";
import { Typography, Button } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import OptionField from "./OptionField";

const Builder = ({ questionNumber }) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const { slug } = useParams();
  const history = useHistory();

  const maxOptionsReached = options.length >= 6;

  const handleQuestionsClick = () => {
    history.push(`/dashboard/quizzes/${slug}/edit`);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleDelete = idx => {
    if (options.length <= 2) {
      return;
    }
    setOptions(options.filter((_, index) => index !== idx));
  };

  const handleOptionChange = (idx, value) => {
    const updated = [...options];
    updated[idx] = value;
    setOptions(updated);
  };

  const handleSave = async () => {
    const payload = {
      title,
      // options: options.filter(option => option.trim() !== ""),
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      option5: options[4],
      option6: options[5],
      correct_option: correctOption,
      quiz_slug: slug,
      question_number: questionNumber,
    };
    try {
      await questionsApi.create(slug, payload);
      history.push(`/dashboard/quizzes/${slug}/edit`);
    } catch {
      // console.error("Error saving question:", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-12">
      <div className="h-full w-3/4 p-6">
        <Typography
          className="mb-4 flex flex-row items-center font-medium text-gray-400"
          style="h4"
        >
          <div className="cursor-pointer" onClick={handleQuestionsClick}>
            All Questions
          </div>
          <Right size={20} />{" "}
          <Typography className="text-gray-500" style="h4">
            Question {questionNumber}
          </Typography>
        </Typography>
        <div className="body mt-10">
          <div className="border-b-2 border-gray-300 pb-4">
            <InlineInput
              disableHover
              placeholder="Enter question title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="options mt-8 space-y-3">
            {options.map((option, index) => (
              <OptionField
                correctOption={correctOption}
                handleDelete={() => handleDelete(index)}
                handleOptionChange={handleOptionChange}
                index={index}
                key={index}
                option={option}
                setCorrectOption={setCorrectOption}
                // maxOptionsReached={maxOptionsReached}
              />
            ))}
          </div>
          <div className="mt-2">
            <Button
              className="mt-4"
              disabled={maxOptionsReached}
              label="Add Option"
              style="link"
              tooltipProps={{
                content: "Maximum 6 options allowed",
                disabled: maxOptionsReached,
                position: "top",
              }}
              onClick={handleAddOption}
            />
          </div>
          <div className="mt-6 flex flex-row space-x-3">
            <Button
              className="mt-6"
              label="Save"
              style="primary"
              onClick={handleSave}
            />
            <Button
              className="mt-6"
              label="Save & add new question"
              style="secondary"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
