import React, { useState, useEffect, useRef } from "react";

import authenticationApi from "apis/authentication";
import classNames from "classnames";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import { Bulb, Settings, Community, LeftArrow } from "neetoicons";
import { NeetoQuiz } from "neetoicons/logos";
import { NavLink, useLocation, Link } from "react-router-dom";
import { routes } from "src/routes";

import Profile from "./Profile";

// import { APP_NAME, SIDENAV_LINKS } from "./constants";
// import SidebarMenu from "./SidebarMenu";

//   const bottomLinks = [
//     {
//       label: "My profile",
//       onClick: () =>
//         history.push(routes.dashboard.settings.profile, { resetTab: true }),
//     },
//     {
//       label: "Change password",
//       onClick: () =>
//         history.push(routes.dashboard.settings.changePassword, {
//           resetTab: true,
//         }),
//     },
//     {
//       label: "Logout",
//       onClick: handleLogout,
//     },
//   ];

//   return (
//     <SidebarMenu
//       appName={APP_NAME}
//       navLinks={SIDENAV_LINKS}
//       organizationInfo={{
//         name: "QuizIt",
//         subdomain: "bigbinary.com",
//         logo: <NeetoQuiz />,
//       }}
//       profileInfo={{
//         name: `${user.first_name} ${user.last_name}`,
//         imageUrl: user.profile_image_path,
//         email: user.email,
//         bottomLinks,
//       }}
//     />
//   );
// };

// export default Sidebar;

// import { routes } from "constants/routes";

const SideBar = () => {
  const authDispatch = useAuthDispatch();
  const { user } = useUserState();
  const PROFILE_IMAGE_URL =
    "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg";
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isLoggedin = user.auth_token !== null;
  const menuRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await authenticationApi.logout();
      authDispatch({ type: "LOGOUT" });
      window.location.href = routes.auth.public;
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex w-20 flex-col items-center justify-between space-y-6 border-2 py-6 text-white shadow-sm">
      <div className="flex w-20 flex-col items-center space-y-6 text-white">
        <div className="rounded-lg bg-gray-800 p-2 text-2xl font-bold">
          <NeetoQuiz />
        </div>
        <NavLink
          to={routes.dashboard.quizzes}
          className={classNames({
            "text-blue-400": pathname === routes.dashboard.quizzes,
            "text-gray-400": pathname !== routes.dashboard.quizzes,
          })}
        >
          <Bulb />
        </NavLink>
        <NavLink
          to={routes.dashboard.settings.index}
          className={classNames({
            "text-blue-400": pathname === routes.dashboard.settings.index,
            "text-gray-400": pathname !== routes.dashboard.settings.index,
          })}
        >
          <Settings />
        </NavLink>
        <NavLink
          target="_blank"
          to={routes.public}
          className={classNames({
            "text-blue-400": pathname === routes.public,
            "text-gray-400": pathname !== routes.public,
          })}
        >
          <Community />
        </NavLink>
      </div>
      <div className="relative" ref={menuRef}>
        <Profile profile_img_url={PROFILE_IMAGE_URL} onClick={toggleMenu} />
        {isMenuVisible && isLoggedin && (
          <div className="absolute bottom-1 left-20 z-20 mt-2 w-80 rounded-md border border-gray-300 bg-white pt-1 shadow-xl">
            <div className="flex flex-row items-center space-x-2 border-b-2 p-3">
              <Profile profile_img_url={PROFILE_IMAGE_URL} />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-gray-800">{`${user.first_name} ${user.last_name}`}</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            <Link
              className="block cursor-pointer px-3 py-2.5 text-base font-semibold text-gray-800 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LeftArrow className="mr-2 inline" />
              Log out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
