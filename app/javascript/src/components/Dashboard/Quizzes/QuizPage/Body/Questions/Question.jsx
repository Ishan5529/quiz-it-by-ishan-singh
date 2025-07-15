import React from "react";

const Question = () => (
  <div className="question-container">
    <h3 className="question-title">Question Title</h3>
    <p className="question-description">
      This is where the question description goes.
    </p>
    <div className="question-options">
      <label>
        <input name="option" type="radio" value="option1" />
        Option 1
      </label>
      <label>
        <input name="option" type="radio" value="option2" />
        Option 2
      </label>
      <label>
        <input name="option" type="radio" value="option3" />
        Option 3
      </label>
      <label>
        <input name="option" type="radio" value="option4" />
        Option 4
      </label>
    </div>
  </div>
);

export default Question;
