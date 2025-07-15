import React, { useState } from "react";

import { useParams } from "react-router-dom";

import Body from "./Body";
import Header from "./Header";

const QuizPage = () => {
  const [title, setTitle] = useState("");
  const { slug } = useParams();

  const handleTitleUpdate = event => {
    // Logic to handle title update
    setTitle(event.target.value);
    // You can also add any additional logic here, like saving the title to a server
  };

  const handleInputBlur = () => {
    // console.log("Title updated successfully!");
    // You can add logic here to save the title to a server or perform any other action
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[10%] w-full items-center border-b-2 border-gray-300">
        <Header {...{ title, slug, handleTitleUpdate, handleInputBlur }} />
      </div>
      <div className="h-[90%] w-full">
        <Body />
      </div>
    </div>
  );
};

export default QuizPage;
