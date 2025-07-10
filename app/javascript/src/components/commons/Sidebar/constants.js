// import { Bulb, Settings, Community } from "neetoicons";
import { Notes, Settings } from "neetoicons";

export const APP_NAME = "QuizIt";

export const PASSWORD_PATH = "/my/password/edit";
export const PROFILE_PATH = "/my/profile";
export const LOGOUT_PATH = "/logout";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: "/quizzes",
    // icon: Bulb,
    icon: Notes,
  },
  {
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
  {
    label: "Public page",
    to: "/public",
    // icon: Community,
    icon: Notes,
    target: "_blank",
  },
];
