import { Bulb, Settings, Community } from "neetoicons";
import { routes } from "src/routes";

export const APP_NAME = "QuizIt";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: routes.dashboard.quizzes,
    icon: Bulb,
    icon_size: 28,
    sub_links: [
      {
        label: "All",
        to: routes.dashboard.quizzes,
        count: 30,
      },
      {
        label: "Published",
        to: `${routes.dashboard.quizzes}?status=published`,
        count: 20,
      },
      {
        label: "Draft",
        to: `${routes.dashboard.quizzes}?status=draft`,
        count: 10,
      },
    ],
  },
  {
    label: "Settings",
    to: routes.dashboard.settings.index,
    icon: Settings,
    icon_size: 24,
  },
  {
    label: "Public page",
    to: routes.public,
    icon: Community,
    target: "_blank",
    icon_size: 24,
  },
];
