import { routes } from "src/routes";

import Email from "./Email";
import Password from "./Password";
import Profile from "./Profile";

// Note: This is not kept in constants.js to avoid dependency cycle
export const SETTINGS_NAVLINKS = [
  {
    key: "profile",
    label: "Profile",
    description: "Manage user",
    path: routes.dashboard.settings.profile,
    component: Profile,
  },
  {
    key: "email",
    label: "Email",
    description: "Manage email",
    path: routes.dashboard.settings.email,
    component: Email,
  },
  {
    key: "password",
    label: "Password",
    description: "Manage password",
    path: routes.dashboard.settings.changePassword,
    component: Password,
  },
];
