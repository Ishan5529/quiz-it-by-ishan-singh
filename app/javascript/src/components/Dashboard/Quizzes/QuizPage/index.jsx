import React, { useState } from "react";

import Body from "./Body";
import Header from "./Header";

const CreationPage = () => {
  const [title, setTitle] = useState("");
  const handleTitleUpdate = event => {
    // Logic to handle title update
    setTitle(event.target.value);
    // You can also add any additional logic here, like saving the title to a server
  };

  return (
    <div className="flex h-full flex-col">
      <Header {...{ title, handleTitleUpdate }} />
      <Body />
    </div>
  );
};

export default CreationPage;
