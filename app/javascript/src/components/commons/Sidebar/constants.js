import { Bulb, Settings, Community } from "neetoicons";
import { routes } from "src/routes";

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
        count: 30,
      },
      {
        label: "Published",
        to: `${routes.dashboard.quizzes.index}?status=published`,
        count: 20,
      },
      {
        label: "Draft",
        to: `${routes.dashboard.quizzes.index}?status=draft`,
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
    to: routes.public.index,
    icon: Community,
    target: "_blank",
    icon_size: 24,
  },
];

export const PROFILE_IMAGE_URL =
  "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
