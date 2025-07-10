import React from "react";

// import { Sidebar as NeetoUISidebar } from "@bigbinary/neeto-molecules/Sidebar";
// import NeetoUISidebar from "../NeetoUISidebar";

// eslint-disable-next-line arrow-body-style
const Sidebar = () => {
  // const history = useHistory();
  // const authDispatch = useAuthDispatch();
  // const { user } = useUserState();

  // const handleLogout = async () => {
  //   try {
  //     await authenticationApi.logout();
  //     authDispatch({ type: "LOGOUT" });
  //     window.location.href = PUBLIC_PATH;
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };

  // const bottomLinks = [
  //   {
  //     label: "My profile",
  //     onClick: () => history.push(PROFILE_PATH, { resetTab: true }),
  //   },
  //   {
  //     label: "Change password",
  //     onClick: () => history.push(CHANGE_PASSWORD_PATH, { resetTab: true }),
  //   },
  //   {
  //     label: "Logout",
  //     onClick: handleLogout,
  //   },
  // ];

  return (
    // <NeetoUISidebar
    //   appName={APP_NAME}
    //   changelogProps={{ id: "neetochangelog-trigger" }}
    //   navLinks={SIDENAV_LINKS}
    //   organizationInfo={{
    //     name: "QuizIt",
    //     subdomain: "bigbinary.com",
    //     logo: <NeetoQuiz />,
    //   }}
    //   profileInfo={{
    //     name: `${user.first_name} ${user.last_name}`,
    //     imageUrl: user.profile_image_path,
    //     email: user.email,
    //     bottomLinks,
    //   }}
    // />
    <div>Hello</div>
  );
};

export default Sidebar;
