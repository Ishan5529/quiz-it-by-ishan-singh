import React from "react";

import { Switch, Route } from "react-router-dom";

import Questions from "./Questions";
import Builder from "./Questions/Builder";
import Submissions from "./Submissions";

const Body = () => (
  <div className="quiz-body-container h-full w-full">
    <Switch>
      <Route exact component={Questions} path="/dashboard/quizzes/:slug/edit" />
      <Route
        exact
        component={Builder}
        path="/dashboard/quizzes/:slug/add-question"
      />
      <Route
        exact
        component={Submissions}
        path="/dashboard/quizzes/:slug/submissions"
      />
    </Switch>
  </div>
);

export default Body;
