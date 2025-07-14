import React from "react";

{
  /* <SidebarMenu
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
/> */
}

const SidebarMenu = ({ appName, navLinks, organizationInfo, profileInfo }) => (
  <div className="sidebar-menu">
    <div className="sidebar-header">
      <img alt={`${appName} Logo`} src={organizationInfo.logo} />
      <h1>{appName}</h1>
    </div>
    <nav className="sidebar-nav">
      {navLinks.map((link, index) => (
        <a href={link.to} key={index} target={link.target || "_self"}>
          {link.icon && <link.icon />}
          {link.label}
        </a>
      ))}
    </nav>
    <div className="sidebar-profile">
      <img alt={`${profileInfo.name}'s Profile`} src={profileInfo.imageUrl} />
      <h2>{profileInfo.name}</h2>
      <p>{profileInfo.email}</p>
      <ul>
        {profileInfo.bottomLinks.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SidebarMenu;
