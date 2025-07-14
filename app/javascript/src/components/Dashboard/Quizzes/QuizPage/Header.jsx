import React from "react";

import { InlineInput } from "components/commons";

const Header = ({ title, handleTitleUpdate }) => (
  <div className="flex h-full flex-col">
    <InlineInput
      placeholder="Enter quiz title"
      value={title}
      onChange={handleTitleUpdate}
    />
  </div>
);

export default Header;
