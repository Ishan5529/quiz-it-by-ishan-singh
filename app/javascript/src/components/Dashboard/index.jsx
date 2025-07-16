import React from "react";

import Sidebar from "components/commons/Sidebar";
import { DASHBOARD_ROUTES } from "components/routeConstants";
import { Route, Redirect, Switch } from "react-router-dom";
import { routes } from "src/routes";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component, exact }) => (
        <Route component={component} exact={exact} key={path} path={path} />
      ))}
      <Redirect
        from={routes.dashboard.index}
        to={routes.dashboard.quizzes.index}
      />
    </Switch>
  </div>
);

export default Dashboard;
