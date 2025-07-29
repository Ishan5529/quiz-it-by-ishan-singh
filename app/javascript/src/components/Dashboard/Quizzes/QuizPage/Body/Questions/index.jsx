import React, { useState, useEffect } from "react";

import { PageNotFound } from "components/commons";
import { useQuestionsFetch } from "hooks/reactQuery/useQuestionsApi";
import { useQuizzesUpdate } from "hooks/reactQuery/useQuizzesApi";
import { useParams, useHistory, Switch, Route } from "react-router-dom";
import { routes } from "routes";
import withTitle from "utils/withTitle";

import Builder from "./Builder";
import Display from "./Display";

const Questions = () => {
  const history = useHistory();
  const { slug } = useParams();
  const [isQuestionDirty, setIsQuestionDirty] = useState(false);

  const { mutate: updateQuiz } = useQuizzesUpdate();

  useEffect(() => {
    if (!isQuestionDirty) {
      return;
    }

    updateQuiz({
      slugs: [slug],
      quiet: true,
      payload: { isDraft: true },
    });
    setIsQuestionDirty(false);
  }, [isQuestionDirty]);

  const { data: { data: { questions } = {} } = {}, isLoading } =
    useQuestionsFetch(slug);

  const handleQuestionAddClick = () => {
    const link = routes.dashboard.quizzes.edit.addQuestion.replace(
      ":slug",
      slug
    );
    history.push(link);
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
      <Route component={PageNotFound} path={routes.pageNotFound} />
    </Switch>
  );
};

export default withTitle(Questions, "Quiz Editor");
