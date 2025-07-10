import React from "react";

// import { Sidebar as NeetoUISidebar } from "@bigbinary/neeto-molecules/Sidebar";
import authenticationApi from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { NeetoQuiz } from "neetoicons/logos";
import { useHistory } from "react-router-dom";
import { routes } from "src/routes";

import { APP_NAME, SIDENAV_LINKS } from "./constants";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const history = useHistory();
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.auth.public;
    } catch (error) {
      logger.error(error);
    }
  };

  const bottomLinks = [
    {
      label: "My profile",
      onClick: () =>
        history.push(routes.dashboard.settings.profile, { resetTab: true }),
    },
    {
      label: "Change password",
      onClick: () =>
        history.push(routes.dashboard.settings.changePassword, {
          resetTab: true,
        }),
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <SidebarMenu
      appName={APP_NAME}
      navLinks={SIDENAV_LINKS}
      organizationInfo={{
        name: "QuizIt",
        subdomain: "bigbinary.com",
        logo: <NeetoQuiz />,
      }}
      profileInfo={{
        name: `${user.first_name} ${user.last_name}`,
        imageUrl: user.profile_image_path,
        email: user.email,
        bottomLinks,
      }}
    />
  );
};

export default Sidebar;
