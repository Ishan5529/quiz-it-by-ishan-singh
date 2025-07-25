import { Bulb, Settings, Community } from "neetoicons";
import { routes } from "routes";

export const APP_NAME = "QuizIt";

export const SIDENAV_LINKS = [
  {
    label: "Quizzes",
    to: routes.dashboard.quizzes.index,
    icon: Bulb,
    icon_size: 28,
    sub_links: [
      {
        label: "All",
        to: routes.dashboard.quizzes.index,
        count: 0,
      },
      {
        label: "Published",
        to: `${routes.dashboard.quizzes.index}?status=published`,
        count: 0,
      },
      {
        label: "Draft",
        to: `${routes.dashboard.quizzes.index}?status=draft`,
        count: 0,
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
    to: routes.public.index,
    icon: Community,
    target: "_blank",
    icon_size: 24,
  },
];
