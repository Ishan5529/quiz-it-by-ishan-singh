import React from "react";

import { useQuestionsFetch } from "hooks/reactQuery/useQuestionsApi";
import { useParams, useHistory, Switch, Route } from "react-router-dom";
import { routes } from "routes";

import Builder from "./Builder";
import Display from "./display";

const Questions = () => {
  const history = useHistory();
  const { slug } = useParams();

  const { data: { data: { questions } = {} } = {}, isLoading } =
    useQuestionsFetch(slug);

  const handleQuestionAddClick = () => {
    history.push(`/dashboard/quizzes/${slug}/edit/add-question`);
  };

  return (
    <Switch>
      <Route
        path={routes.dashboard.quizzes.edit.addQuestion}
        render={() => <Builder questionNumber={questions?.length + 1 || 1} />}
      />
      <Route
        path={routes.dashboard.quizzes.edit.index}
        render={() => (
          <Display
            isLoading={isLoading}
            questions={questions}
            onAddClick={handleQuestionAddClick}
          />
        )}
      />
    </Switch>
  );
};

export default Questions;
