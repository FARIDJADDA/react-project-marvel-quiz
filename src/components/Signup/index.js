import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase/";

// Variable locale ,objet avec toute les infos relative au form

// console.log(props)
const Signup = (props) => {
  // ----objet  <----------->  param du context
  const firebase = useContext(FirebaseContext);
  //-------------------------------------------
  // console.log(firebase);

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Variable d'Etat
  const [loginData, setLoginData] = useState(data); // etat des data
  const [error, setError] = useState(""); // etat des erreurs 2
  //---------------

  const { pseudo, email, password, confirmPassword } = loginData; // input value destructuring **

  const handleChange = (e) => {
    //                               id <--------- Value MAJ par rapport à l'id
    setLoginData({ ...loginData, [e.target.id]: e.target.value }); // capture de la value par le onChange
  };

  // logique Affichage conditionnel button apres capture de toute les values dans l'input
  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );
  // -----------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    firebase
      // Methode class Firebase(Gerer l'auth de l'utilisateur)
      .signupUser(email, password)
      //------------------------
      .then((authUser) => {
        return firebase.user(authUser.user.uid).set({
          pseudo,
          email,
        });
      })
      .then((user) => {
        // il a été enregistré
        setLoginData({ ...data }); // effacer les valeure de l'input
        props.history.push("/welcome"); // redirection
      })
      .catch((error) => {
        // il y a un echec
        setError(error); // affichage msg erreur -->voir condition (Gestion des erreur) 2
        setLoginData({ ...data }); // effacer les valeure de l'input
      });
  };

  // Gestion des Erreurs: 2
  const errorMsg = error !== "" && <span>{error.message}</span>;
  //-----------------------

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}

            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  // ** {loginData.pseudo}
                  value={pseudo}
                  type="text"
                  id="pseudo"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={password}
                  type="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChange}
                  value={confirmPassword}
                  type="password"
                  id="confirmPassword"
                  required // obligation de remplir le input
                  // autoComplete="off" ---> pas d'auto-compression
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit, Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
