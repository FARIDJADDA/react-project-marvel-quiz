import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, quizLevel }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const quizTest = levelNames.map((name) => ({ title: name.toUpperCase() }));

    setLevels(quizTest);
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={levels}
        activeStep={quizLevel} // 0, 1 , 2
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        completeTitleColor={"rgb(224,224,224)"}
        defaultTitleColor={"rgb(224,224,224)"}
        completeColor={"rgb(224,224,224)"}
        completeBarColor={"rgb(224,224,224)"}
        barStyle={"dashed"}
        size={45}
      />
    </div>
  );
};

export default React.memo(Levels);
