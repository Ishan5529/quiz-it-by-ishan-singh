import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useParams, useHistory } from "react-router-dom";
import { usePublicQuizzesShow } from "hooks/reactQuery/usePublicQuizzesApi";
import { isEmpty } from "ramda";
import { useAttemptsUpdate } from "hooks/reactQuery/useAttemptsApi";
import useQueryParams from "hooks/useQueryParams";
import { useTranslation } from "react-i18next";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { routes } from "routes";
import withTitle from "utils/withTitle";

const Attempt = () => {
  const { slug, attemptId } = useParams();
  const { isPreview } = useQueryParams();

  const [attemptData, setAttemptData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { mutateAsync: updateAttempt } = useAttemptsUpdate();

  const { t } = useTranslation();
  const history = useHistory();

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
    return <PageLoader />;
  }

  if (isEmpty(quiz?.questions)) {
    return <div>{t("quizzes.empty.questions")}</div>;
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

  const handleSubmit = (isComplete = true) => {
    const questions = attemptData.map(({ questionId, selectedOption }) => ({
      question_id: questionId,
      selected_option: selectedOption,
    }));

    const payload = {
      status: isComplete ? "completed" : "incomplete",
      questions,
    };

    updateAttempt(
      { slug, attemptId, payload, isPreview },
      {
        onSuccess: () => {
          if (isComplete) {
            const link = routes.public.quizzes.result
              .replace(":slug", slug)
              .replace(":attemptId", attemptId);
            history.push(`${link}${isPreview ? "?isPreview=true" : ""}`);
          }
        },
      }
    );
  };

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
    }
    handleSubmit(false);
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
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

export default withTitle(Attempt, "Quiz Session");
