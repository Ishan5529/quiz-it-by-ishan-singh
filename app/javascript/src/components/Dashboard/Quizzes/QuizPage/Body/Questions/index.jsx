import React, { useState, useEffect } from "react";

import questionsApi from "apis/questions";
import EmptyState from "components/commons/EmptyState";

import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const quizSlug = "bwahha";
      const quizSlug = "sdm";
      try {
        const response = await questionsApi.fetch(quizSlug);
        setQuestions(response.data.questions || []);
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <EmptyState title="Loading questions" />;
  }

  if (questions.length === 0) {
    return <EmptyState title="There are no questions to show." />;
  }

  return (
    <div className="edit-quiz-container">
      <h2 className="mb-4 text-2xl font-semibold">Edit Quiz</h2>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div className="questions-list">
          {questions.map(question => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
