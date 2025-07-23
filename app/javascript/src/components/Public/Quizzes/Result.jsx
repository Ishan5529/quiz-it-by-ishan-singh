import React from "react";
import { useAttemptsShow } from "hooks/reactQuery/useAttemptsApi";
import { useParams, useHistory } from "react-router-dom";
import useQueryParams from "hooks/useQueryParams";
import { isEmpty } from "ramda";

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow">
        <button
          className="mb-6 flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleBack}
        >
          <svg
            className="mr-2"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to home
        </button>
        <h1 className="mb-2 text-center text-3xl font-bold">Your result</h1>
        <div className="mb-6 text-right text-gray-500">
          Total questions: {totalQuestions}
        </div>
        <div className="mb-8 flex justify-center gap-6">
          <div className="rounded-lg bg-gray-100 px-8 py-4 text-center">
            <div className="text-lg font-semibold text-gray-700">Score</div>
            <div className="text-2xl font-bold">
              {score}/{totalQuestions}
            </div>
          </div>
          <div className="rounded-lg bg-green-50 px-8 py-4 text-center">
            <div className="text-lg font-semibold text-green-700">Correct</div>
            <div className="text-2xl font-bold text-green-700">
              {attempt.correct_answers}
            </div>
          </div>
          <div className="rounded-lg bg-red-50 px-8 py-4 text-center">
            <div className="text-lg font-semibold text-red-700">Incorrect</div>
            <div className="text-2xl font-bold text-red-700">{incorrect}</div>
          </div>
          <div className="rounded-lg bg-gray-100 px-8 py-4 text-center">
            <div className="text-lg font-semibold text-gray-500">
              Unanswered
            </div>
            <div className="text-2xl font-bold text-gray-500">{unanswered}</div>
          </div>
        </div>
        {attempt.questions.map((q, idx) => {
          const isCorrect = q.selected_option === q.correct_option;
          const isUnanswered = !q.selected_option;
          return (
            <div key={q.question_id} className="mb-8">
              <div className="mb-2 font-medium text-gray-600">
                Question {idx + 1}
              </div>
              <div className="mb-4 text-xl font-bold">
                {q.title || `Question ${idx + 1}`}
              </div>
              <div className="flex flex-col gap-2">
                {q.options.map((option, i) => {
                  const optionIndex = (i + 1).toString();
                  const isUserAnswer = q.selected_option === optionIndex;
                  const isCorrectAnswer = q.correct_option === optionIndex;
                  return (
                    <div
                      key={option}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3
                        ${
                          isUserAnswer && isCorrectAnswer
                            ? "border-green-600 bg-green-50"
                            : ""
                        }
                        ${
                          isUserAnswer && !isCorrectAnswer
                            ? "border-red-600 bg-red-50"
                            : ""
                        }
                        ${
                          isCorrectAnswer && !isUserAnswer
                            ? "border-green-600 bg-white"
                            : "border-gray-200 bg-white"
                        }
                      `}
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
