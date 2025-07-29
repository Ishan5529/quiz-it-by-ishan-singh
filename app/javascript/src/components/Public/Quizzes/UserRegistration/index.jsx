import React, { useState } from "react";

import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { useParams } from "react-router-dom";
import { usePublicQuizzesShow } from "hooks/reactQuery/usePublicQuizzesApi";
import { routes } from "src/routes";
import { capitalize } from "utils";
import PropTypes from "prop-types";
import UserRegistrationForm from "./Form";
import { Button } from "neetoui/index";
import useQueryParams from "hooks/useQueryParams";
import { useAttemptsCreate } from "hooks/reactQuery/useAttemptsApi";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

const UserRegistration = ({ history }) => {
  const { slug } = useParams();
  const { isPreview } = useQueryParams();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createAttempt } = useAttemptsCreate();
  const { t } = useTranslation();

  const { data: { data: quiz = {} } = {} } = usePublicQuizzesShow(slug);

  const handleQuizStart = async () => {
    const payload = {
      status: "incomplete",
      questions: quiz.questions.map(question => ({
        question_id: question.id,
        selected_option: null,
      })),
    };

    createAttempt(
      { slug, payload, isPreview },
      {
        onSuccess: ({
          data: {
            attempt: { id },
          },
        }) => {
          const link = `${routes.public.quizzes.attempts.new
            .replace(":slug", slug)
            .replace(":attemptId", id)}${isPreview ? "?isPreview=true" : ""}`;

          history.push(link);
        },
      }
    );
  };

  const handleLogin = async ({ email }) => {
    try {
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({ email, password: "welcome" });
      authDispatch({
        type: "LOGIN",
        payload: { auth_token, email, is_admin },
      });
      userDispatch({ type: "SET_USER", payload: { user } });
      handleQuizStart();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async ({ email, firstName, lastName }) => {
    setIsSubmitting(true);
    try {
      await authenticationApi.signup({
        email,
        firstName,
        lastName,
        password: "example",
        passwordConfirmation: "example",
        role: "standard",
        quiet: true,
      });

      handleLogin({ email });
    } catch (error) {
      if (
        error?.response?.data?.error?.toLowerCase().includes("email") &&
        error?.response?.data?.error?.toLowerCase().includes("taken")
      ) {
        handleLogin({ email });
      } else {
        logger.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-xl">
        <div className="neeto-ui-bg-white neeto-ui-shadow-s w-full rounded-lg p-10">
          <h2 className="neeto-ui-text-gray-800 mb-2 text-left text-3xl font-extrabold">
            {capitalize(quiz?.title)} {t("labels.quiz").toLowerCase()}
          </h2>
          <p className="mb-2 text-left text-base text-gray-600">
            {quiz?.description || t("quizzes.empty.description")}
          </p>
          {isPreview ? (
            <div className="flex flex-col">
              <p className="mb-12 text-left text-base text-gray-600">
                {t("quizzes.preview", { title: quiz?.title })}
              </p>
              <div className="flex flex-row justify-end space-x-2">
                <Button
                  label={t("labels.startQuiz")}
                  style="primary"
                  onClick={handleQuizStart}
                />
                <Button
                  label={t("labels.back")}
                  style="secondary"
                  onClick={() => history.goBack()}
                />
              </div>
            </div>
          ) : (
            <UserRegistrationForm
              {...{
                quiz,
                isSubmitting,
                onSubmit: handleSubmit,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

UserRegistration.propTypes = {
  history: PropTypes.object,
};

export default withTitle(UserRegistration, "Quiz Registration");
