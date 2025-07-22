import React from "react";

import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuizzesShow } from "hooks/reactQuery/useQuizzesApi";
import { routes } from "src/routes";
import { capitalize } from "utils";
import {
  REGISTRATION_FORM_INITIAL_VALUES,
  REGISTRATION_FORM_VALIDATION_SCHEMA,
} from "./constants";

const UserRegistration = ({ history }) => {
  const { slug } = useParams();

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const { data: { data: { quiz } = {} } = {} } = useQuizzesShow(slug);

  const handleSubmit = async ({ email, firstName, lastName }) => {
    try {
      await authenticationApi.signup({
        email,
        firstName,
        lastName,
        password: "example",
        passwordConfirmation: "example",
        role: "standard",
      });
    } catch (error) {
      if (
        error?.response?.data?.error?.toLowerCase().includes("email") &&
        error?.response?.data?.error?.toLowerCase().includes("taken")
      ) {
        const {
          data: { auth_token, user, is_admin },
        } = await authenticationApi.login({ email, password: "example" });
        authDispatch({
          type: "LOGIN",
          payload: { auth_token, email, is_admin },
        });
        userDispatch({ type: "SET_USER", payload: { user } });
        history.push(routes.dashboard.index);
      } else {
        logger.error(error);
      }
    }
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-xl">
        <div className="neeto-ui-bg-white neeto-ui-shadow-s w-full rounded-lg p-10">
          <h2 className="neeto-ui-text-gray-800 mb-2 text-left text-3xl font-extrabold">
            {capitalize(quiz?.title)} quiz
          </h2>
          <p className="mb-8 text-left text-base text-gray-600">
            {quiz?.description || "No quiz description provided."}
          </p>
          <Formik
            initialValues={REGISTRATION_FORM_INITIAL_VALUES}
            validationSchema={REGISTRATION_FORM_VALIDATION_SCHEMA}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="flex flex-row space-x-4">
                  <Input
                    required
                    label="Full name"
                    name="firstName"
                    placeholder="First name"
                    className="w-1/2"
                  />
                  <Input
                    label="&nbsp;"
                    name="lastName"
                    placeholder="Last name"
                    className="w-1/2"
                  />
                </div>
                <Input
                  required
                  label="Email address"
                  name="email"
                  placeholder="oliver@example.com"
                  type="email"
                />
                <Button
                  fullWidth
                  className="h-10"
                  data-cy="start-quiz-button"
                  disabled={isSubmitting}
                  label="Start quiz"
                  loading={isSubmitting}
                  size="large"
                  type="submit"
                  style="primary"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

UserRegistration.propTypes = {
  history: PropTypes.object,
};

export default UserRegistration;
