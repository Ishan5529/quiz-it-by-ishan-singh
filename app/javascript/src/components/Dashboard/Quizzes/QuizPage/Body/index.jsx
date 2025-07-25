import React from "react";

import { Switch, Route } from "react-router-dom";

import Questions from "./Questions";
import Submissions from "./Submissions";
import DownloadReport from "./Submissions/DownloadReport";

const Body = () => (
  <div className="quiz-body-container h-full w-full">
    <Switch>
      <Route component={Questions} path="/dashboard/quizzes/:slug/edit" />
      <Route
        exact
        component={Submissions}
        path="/dashboard/quizzes/:slug/submissions"
      />
      <Route
        exact
        component={DownloadReport}
        path="/dashboard/quizzes/:slug/submissions/report"
      />
    </Switch>
  </div>
);

export default Body;
