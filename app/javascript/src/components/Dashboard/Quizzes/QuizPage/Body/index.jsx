import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Questions from "./Questions";
import Submissions from "./Submissions";

const Body = () => (
  <div className="quiz-body-container">
    <BrowserRouter>
      <Switch>
        <Route
          exact
          component={Questions}
          path="/dashboard/quizzes/:slug/edit"
        />
        <Route
          exact
          component={Submissions}
          path="/dashboard/quizzes/:slug/submissions"
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Body;
