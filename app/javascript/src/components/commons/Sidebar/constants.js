import { t } from "i18next";
import { Bulb, Settings, Community } from "neetoicons";
import { routes } from "routes";

export const APP_NAME = "QuizIt";

export const SIDENAV_LINKS = [
  {
    label: t("labels.quizzes"),
    to: routes.dashboard.quizzes.index,
    icon: Bulb,
    icon_size: 28,
    sub_links: [
      {
        label: t("labels.all"),
        to: routes.dashboard.quizzes.index,
        count: 0,
      },
      {
        label: t("labels.published"),
        to: `${routes.dashboard.quizzes.index}?status=published`,
        count: 0,
      },
      {
        label: t("labels.draft"),
        to: `${routes.dashboard.quizzes.index}?status=draft`,
        count: 0,
      },
    ],
  },
  {
    label: t("labels.settings"),
    to: routes.dashboard.settings.index,
    icon: Settings,
    icon_size: 24,
  },
  {
    label: t("labels.publicPage"),
    to: routes.public.index,
    icon: Community,
    target: "_blank",
    icon_size: 24,
  },
];
