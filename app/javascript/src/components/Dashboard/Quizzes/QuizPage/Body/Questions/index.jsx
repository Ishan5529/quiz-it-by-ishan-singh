import { QUERY_KEYS } from "constants/query";

import React, { useState, useEffect } from "react";

import { useClearQueryClient } from "hooks/reactQuery/useClearQueryClient";
import { useQuestionsFetch } from "hooks/reactQuery/useQuestionsApi";
import { useParams, useHistory, Switch, Route } from "react-router-dom";
import { routes } from "routes";

import Builder from "./Builder";
import Display from "./display";

const Questions = () => {
  const history = useHistory();
  const { slug } = useParams();
  const [isQuestionDirty, setIsQuestionDirty] = useState(false);
  const clearQueryClient = useClearQueryClient();

  useEffect(() => {
    if (!isQuestionDirty) {
      return;
    }

    clearQueryClient(QUERY_KEYS.QUESTIONS);
    clearQueryClient(QUERY_KEYS.QUIZZES);
    setIsQuestionDirty(false);
  }, [isQuestionDirty]);

  const { data: { data: { questions } = {} } = {}, isLoading } =
    useQuestionsFetch(slug);

  const handleQuestionAddClick = () => {
    history.push(`/dashboard/quizzes/${slug}/edit/add-question`);
  };

  return (
    <Switch>
      <Route
        path={routes.dashboard.quizzes.edit.addQuestion}
        render={() => (
          <Builder
            position={questions?.length + 1 || 1}
            setIsDirty={setIsQuestionDirty}
          />
        )}
      />
      <Route
        path={routes.dashboard.quizzes.edit.editQuestion}
        render={() => <Builder isEdit setIsDirty={setIsQuestionDirty} />}
      />
      <Route
        path={routes.dashboard.quizzes.edit.index}
        render={() => (
          <Display
            {...{ questions, slug, isLoading }}
            setIsDirty={setIsQuestionDirty}
            onAddClick={handleQuestionAddClick}
          />
        )}
      />
    </Switch>
  );
};

export default Questions;
