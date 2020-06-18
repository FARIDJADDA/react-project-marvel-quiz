import React from "react";

const index = (props) => {
  const btnNext =
    props.idQuestion < props.maxQuestions - 1 ? "Suivant" : "Terminé";

  return (
    <div>
      <h2>{props.question}</h2>
      {props.displayOption}
      <button
        disabled={props.btnDisabled}
        className="btnSubmit"
        onClick={props.nextQuestion}
      >
        {btnNext}
      </button>
    </div>
  );
};

export default index;
