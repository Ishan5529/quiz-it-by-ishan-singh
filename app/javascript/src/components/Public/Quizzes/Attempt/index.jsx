import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { usePublicQuizzesShow } from "hooks/reactQuery/usePublicQuizzesApi";
import { isEmpty } from "ramda";
import attemptsApi from "apis/attempts";
import useQueryParams from "hooks/useQueryParams";

const Attempt = () => {
  const { slug } = useParams();
  const { isPreview } = useQueryParams();
  const [attemptData, setAttemptData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { data: { data: quiz = {} } = {}, isLoading } =
    usePublicQuizzesShow(slug);

  useEffect(() => {
    if (isLoading || isEmpty(quiz?.questions)) {
      return;
    }
    setAttemptData(
      quiz.questions.map(question => ({
        questionId: question.id,
        selectedOption: null,
      }))
    );
    setQuestionIndex(0);
  }, [quiz, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isEmpty(quiz?.questions)) {
    return <div>No questions found for this quiz.</div>;
  }

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[questionIndex];
  const selectedOption = attemptData[questionIndex]?.selectedOption ?? null;

  const onOptionSelect = (questionId, option) => {
    setAttemptData(prevData =>
      prevData.map(question =>
        question.questionId === questionId
          ? { ...question, selectedOption: option }
          : question
      )
    );
  };

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const questions = attemptData.map(({ questionId, selectedOption }) => ({
      question_id: questionId,
      selected_option: selectedOption,
    }));

    const payload = {
      status: "completed",
      questions,
    };

    try {
      await attemptsApi.create(slug, payload, isPreview);
      console.log("Attempt submitted successfully");
    } catch (error) {
      logger.error("Error submitting attempt:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Question
        questionNumber={questionIndex + 1}
        totalQuestions={totalQuestions}
        question={currentQuestion}
        selectedOption={selectedOption}
        onOptionSelect={onOptionSelect}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isFirst={questionIndex === 0}
        isLast={questionIndex === totalQuestions - 1}
      />
    </div>
  );
};

export default Attempt;
