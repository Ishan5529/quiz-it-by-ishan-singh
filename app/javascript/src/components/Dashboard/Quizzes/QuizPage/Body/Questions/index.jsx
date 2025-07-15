import React, { useState, useEffect } from "react";

import questionsApi from "apis/questions";
import EmptyState from "components/commons/EmptyState";
import { Button } from "neetoui";
import { isEmpty } from "ramda";
import { useParams } from "react-router-dom";

import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await questionsApi.fetch(slug);
        setQuestions(response.data.questions || []);
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuestionAdd = () => {
    // Question addition logic goes here
  };

  if (loading) {
    return <EmptyState title="Loading questions" />;
  }

  if (isEmpty(questions)) {
    return (
      <EmptyState
        primaryAction={handleQuestionAdd}
        primaryActionLabel="Add new question"
        title="There are no questions to show."
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-100 p-12">
      <div className="flex justify-end">
        <Button label="Add new question" onClick={handleQuestionAdd} />
      </div>
      <div className="questions-list flex h-full w-full flex-col items-center overflow-y-auto">
        <h4 className="mb-2 w-3/4">{questions.length} questions</h4>
        {questions.map(question => (
          <Question key={question.id} {...{ question }} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
