import React from "react";

import { Button } from "neetoui";

import { QUIZ_LIST } from "./constants";

const Features = ({ features }) => (
  <ul className="list-disc">
    {features.map((feature, index) => (
      <li
        className="neeto-ui-border-gray-100 border-b py-3 last:border-0"
        key={index}
      >
        {feature}
      </li>
    ))}
  </ul>
);

const Public = () => (
  <div className="flex h-screen flex-row items-center justify-center">
    <div className="m-auto flex max-w-3xl flex-col items-center justify-center p-8">
      <h1 className="mb-3 text-4xl font-bold">QuizIt</h1>
      <p className="neeto-ui-text-gray-800 mx-auto mb-6 text-center text-lg">
        This is the public page of QuizIt, a platform for creating and sharing
        quizzes.
        <br />
        Please login to access your quizzes and manage your account.
      </p>
      <Features features={QUIZ_LIST} />
      <div className="mt-6 flex items-center justify-center">
        <Button label="Login" to="/login" type="primary" />
      </div>
    </div>
  </div>
);

export default Public;
