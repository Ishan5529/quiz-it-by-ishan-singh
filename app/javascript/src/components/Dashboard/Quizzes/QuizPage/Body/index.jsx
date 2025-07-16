import React from "react";

import { Switch, Route } from "react-router-dom";

import Questions from "./Questions";
import Submissions from "./Submissions";

const Body = () => (
  <div className="quiz-body-container h-full w-full">
    <Switch>
      <Route component={Questions} path="/dashboard/quizzes/:slug/edit" />
      <Route
        exact
        component={Submissions}
        path="/dashboard/quizzes/:slug/submissions"
      />
    </Switch>
  </div>
);

export default Body;
