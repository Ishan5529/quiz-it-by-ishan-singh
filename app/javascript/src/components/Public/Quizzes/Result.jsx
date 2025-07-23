import React from "react";
import { useAttemptsShow } from "hooks/reactQuery/useAttemptsApi";
import { useParams, useHistory } from "react-router-dom";
import useQueryParams from "hooks/useQueryParams";
import { Button, Typography } from "neetoui";
import { Left } from "neetoicons";
import classNames from "classnames";

const Result = () => {
  const history = useHistory();
  const { slug, attemptId } = useParams();
  const { isPreview } = useQueryParams();
  const { data: { data: { attempt } = {} } = {}, isLoading } = useAttemptsShow({
    slug,
    id: attemptId,
    preview: isPreview,
  });

  const handleBack = () => {
    if (isPreview) {
      history.push(`/dashboard/quizzes/${slug}/edit`);
    } else {
      history.push("/public");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!attempt) {
    handleBack();
  }

  const totalQuestions = attempt.questions.length;
  const score = attempt.correct_answers;
  const incorrect = attempt.wrong_answers;
  const unanswered = attempt.unanswered;

  const summaryStats = [
    {
      label: "Score",
      value: `${score} / ${totalQuestions}`,
      bg: "bg-gray-100",
      text: "text-gray-700",
    },
    {
      label: "Correct",
      value: attempt.correct_answers,
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      label: "Incorrect",
      value: incorrect,
      bg: "bg-red-100",
      text: "text-red-700",
    },
    {
      label: "Unanswered",
      value: unanswered,
      bg: "bg-gray-200",
      text: "text-gray-700",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-6xl rounded-lg bg-white p-8 shadow-md">
        <Typography className="mb-16 text-center text-4xl font-bold" style="h1">
          Your result
        </Typography>
        <div className="mb-16 flex w-full items-center justify-between border-b-2 pb-10">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleBack}
          >
            <div className="flex flex-row space-x-2">
              <Left />
              <Typography style="body1">Back to home</Typography>
            </div>
          </Button>
          <Typography style="body1">
            Total questions: {totalQuestions}
          </Typography>
        </div>
        <div className="mb-16 flex justify-center gap-6">
          {summaryStats.map(stat => (
            <div
              key={stat.label}
              className={`flex w-64 flex-col items-center space-y-6 rounded-lg ${stat.bg} px-8 py-4`}
            >
              <Typography style="h3" className={stat.text}>
                {stat.label}
              </Typography>
              <Typography style="h1" className="pb-4 text-5xl text-black">
                {stat.value}
              </Typography>
            </div>
          ))}
        </div>
        {attempt.questions.map((q, idx) => {
          const isCorrect = q.selected_option === q.correct_option;
          const isUnanswered = !q.selected_option;
          return (
            <div key={q.question_id} className="mb-12">
              <div className="mb-2 font-medium text-gray-600">
                Question {idx + 1}
              </div>
              <Typography style="h2" className="mb-4">
                {q.title || `Question ${idx + 1}`}
              </Typography>
              <div className="flex flex-col gap-2">
                {q.options.map((option, i) => {
                  const optionIndex = (i + 1).toString();
                  const isUserAnswer = q.selected_option === optionIndex;
                  const isCorrectAnswer = q.correct_option === optionIndex;
                  return (
                    <div
                      key={option}
                      className={classNames(
                        "flex items-center justify-between rounded-lg border px-4 py-3",
                        {
                          "border-green-600 bg-green-50":
                            isUserAnswer && isCorrectAnswer,
                          "border-green-600 bg-white":
                            !isUserAnswer && isCorrectAnswer,
                          "border-red-600 bg-red-50":
                            isUserAnswer && !isCorrectAnswer,
                          "border-gray-200 bg-white":
                            !isUserAnswer && !isCorrectAnswer,
                        }
                      )}
                    >
                      <div className="flex items-center">
                        {isUserAnswer ? (
                          isCorrectAnswer ? (
                            <span className="mr-2 text-green-600">
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M8 12l2 2 4-4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span className="mr-2 text-red-600">
                              <svg
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M15 9l-6 6M9 9l6 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          )
                        ) : (
                          <span className="mr-2 text-gray-400">
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                        )}
                        <span
                          className={`text-lg font-semibold ${
                            isUserAnswer
                              ? isCorrectAnswer
                                ? "text-green-700"
                                : "text-red-700"
                              : isCorrectAnswer
                              ? "text-green-700"
                              : "text-gray-700"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                      <div className="text-sm font-medium">
                        {isUserAnswer
                          ? "Your Answer"
                          : isCorrectAnswer
                          ? "Correct Answer"
                          : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2">
                {isUnanswered ? (
                  <div className="inline-block rounded bg-gray-100 px-4 py-2 text-gray-500">
                    You did not answer this question
                  </div>
                ) : isCorrect ? (
                  <div className="inline-block rounded bg-green-50 px-4 py-2 text-green-700">
                    Your answer is correct
                  </div>
                ) : (
                  <div className="inline-block rounded bg-red-50 px-4 py-2 text-red-700">
                    Your answer is incorrect
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;
