import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
import Quizzes from "components/Dashboard/Quizzes";
import QuizPage from "components/Dashboard/Quizzes/QuizPage";
import Settings from "components/Dashboard/Settings";
import { routes } from "routes";

export const AUTH_ROUTES = [
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
    path: routes.dashboard.quizzes.index,
    exact: true,
    component: Quizzes,
  },
  {
    path: routes.dashboard.quizzes.quizPage,
    component: QuizPage,
  },
  {
    path: routes.dashboard.settings.index,
    component: Settings,
  },
];
