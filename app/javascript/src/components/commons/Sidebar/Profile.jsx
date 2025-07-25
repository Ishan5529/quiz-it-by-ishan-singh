import React from "react";

import { Avatar } from "@bigbinary/neetoui";

const Profile = ({ profile_img_url, onClick, name = "Oliver Smith" }) => {
  if (!profile_img_url) {
    return (
      <Avatar size="large" status="online" user={{ name }} onClick={onClick} />
    );
  }

  return (
    <Avatar
      size="large"
      status="online"
      user={{ imageUrl: profile_img_url, name }}
      onClick={onClick}
    />
  );
};

export default Profile;
