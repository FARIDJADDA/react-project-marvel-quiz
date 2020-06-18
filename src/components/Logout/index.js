import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import ReactTooltip from "react-tooltip";

const Logout = () => {
  const firebase = useContext(FirebaseContext);

  const [checked, setChecked] = useState(false);
  // console.log(checked);

  useEffect(() => {
    // vérification 2*
    if (checked === true) {
      // s'il est false on fait rien 1*
      console.log("Deconnexion"); // c'est checked donc Decconexion 3*
      firebase.signoutUser();
    }
  }, [checked, firebase]); // checked modifié on relance le useEffect 3*

  const handleChange = (e) => {
    // console.log(e.target);
    setChecked(e.target.checked); // change en true 3*
  };

  // 1* il return
  return (
    <div className="logoutContainer">
      <label className="switch">
        {/* passe en true 3 */}
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
      <ReactTooltip place="left" effect="solid" />
    </div>
  );
};

export default Logout;
