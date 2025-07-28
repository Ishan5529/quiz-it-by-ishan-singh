import { t } from "i18next";
import { routes } from "routes";

import Email from "./Email";
import Organization from "./Organization";
import Password from "./Password";
import Profile from "./Profile";

// Note: This is not kept in constants.js to avoid dependency cycle
export const SETTINGS_NAVLINKS = [
  {
    key: "organization",
    label: t("labels.organization"),
    description: t("labels.organizationDescription"),
    path: routes.dashboard.settings.organization,
    component: Organization,
  },
  {
    key: "profile",
    label: t("labels.profile"),
    description: t("labels.profileDescription"),
    path: routes.dashboard.settings.profile,
    component: Profile,
  },
  {
    key: "email",
    label: t("labels.email"),
    description: t("labels.emailDescription"),
    path: routes.dashboard.settings.email,
    component: Email,
  },
  {
    key: "password",
    label: t("labels.password"),
    description: t("labels.passwordDescription"),
    path: routes.dashboard.settings.changePassword,
    component: Password,
  },
];
