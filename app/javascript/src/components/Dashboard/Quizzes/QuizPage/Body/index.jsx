import React from "react";

import { Switch, Route } from "react-router-dom";
import { routes } from "routes";

import Questions from "./Questions";
import Submissions from "./Submissions";

const Body = () => (
  <div className="quiz-body-container h-full w-full">
    <Switch>
      <Route component={Questions} path={routes.dashboard.quizzes.edit.index} />
      <Route
        exact
        component={Submissions}
        path={routes.dashboard.quizzes.submissions}
      />
    </Switch>
  </div>
);

export default Body;
