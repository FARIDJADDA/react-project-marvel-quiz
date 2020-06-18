import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const Login = (props) => {
  // useContext accéder aux methodes de firebase
  const firebase = useContext(FirebaseContext);

  // Variable pour chaque input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");
  //------------------------------

  // Condition de l'affichage du button
  useEffect(() => {
    if (password.length > 5 && email !== "") {
      // si le mdp est > 5 et que l'eamil et !== ''
      setBtn(true); // button true
    } else if (btn) {
      // retirer le button si on efface le mdp
      setBtn(false);
    }
  }, [password, email, btn]); // dependance à vérifier
  // --------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        props.history.push("/welcome");
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {error !== "" && <span>{error.message}</span>}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled>Connexion</button> //affichage conditionnel
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur Marvel Q ? Inscrivez-vous maintenant .
              </Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">
                mot de passe oublié? Recupérer-le ici
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Link redirection
export default Login;
