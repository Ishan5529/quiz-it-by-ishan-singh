import React from "react";

import Question from "./Question";

const Body = () => (
  <div className="flex-1 p-4">
    <h2 className="text-xl font-semibold">Quiz Body</h2>
    <p className="text-gray-600">
      This is where the quiz content will be displayed.
    </p>
    {/* Quiz questions and options will be rendered here */}
    <Question />
  </div>
);

export default Body;
