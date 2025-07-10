import { Bulb, Settings, Community } from "neetoicons";
import { routes } from "src/routes";

export const APP_NAME = "QuizIt";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: routes.dashboard.quizzes,
    icon: Bulb,
  },
  {
    label: "Settings",
    to: routes.dashboard.settings.index,
    icon: Settings,
  },
  {
    label: "Public page",
    to: routes.public,
    icon: Community,
    target: "_blank",
  },
];
