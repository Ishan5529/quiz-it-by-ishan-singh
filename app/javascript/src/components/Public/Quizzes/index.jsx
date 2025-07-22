import { routes } from "routes";
import React from "react";

import { Switch, Route } from "react-router-dom";

import Attempt from "./Attempt";
import UserRegistration from "./UserRegistration";

const Quizzes = () => (
  <div className="h-screen w-screen">
    <Switch>
      <Route component={Attempt} path={routes.public.quizzes.attempts.new} />
      <Route
        exact
        component={UserRegistration}
        path={routes.public.quizzes.registration}
      />
    </Switch>
  </div>
);

export default Quizzes;
