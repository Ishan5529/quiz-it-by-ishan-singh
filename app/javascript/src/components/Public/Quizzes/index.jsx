import { routes } from "routes";
import React from "react";

import { Switch, Route } from "react-router-dom";

import Attempt from "./Attempt";
import Result from "./Result";
import UserRegistration from "./UserRegistration";

const Quizzes = () => (
  <div className="h-screen w-screen">
    <Switch>
      <Route
        exact
        component={Attempt}
        path={routes.public.quizzes.attempts.new}
      />
      <Route exact component={Result} path={routes.public.quizzes.result} />
      <Route
        exact
        component={UserRegistration}
        path={routes.public.quizzes.registration}
      />
    </Switch>
  </div>
);

export default Quizzes;
