import Login from "components/Authentication/Login";
import PasswordReset from "components/Authentication/ResetPassword";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import Quizzes from "components/Dashboard/Quizzes";
import Settings from "components/Dashboard/Settings";

import { routes } from "../routes";

export const AUTH_ROUTES = [
  {
    path: routes.auth.resetPassword,
    component: PasswordReset,
  },
  {
    path: routes.auth.signup,
    component: Signup,
  },
  {
    path: routes.auth.login,
    component: Login,
  },
];

export const PRIVATE_ROUTES = [
  { path: routes.dashboard.index, component: Dashboard },
];

export const DASHBOARD_ROUTES = [
  {
    path: routes.dashboard.quizzes,
    component: Quizzes,
  },
  {
    path: routes.dashboard.settings.index,
    component: Settings,
  },
];
