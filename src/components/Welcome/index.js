import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../Firebase/";

import Logout from "../Logout";
import Loader from "../Loader";
import Quiz from "../Quiz";

// -------------------------------Secu de la Session d'utilisateur ---------------------------------------
const Welcome = (props) => {
  const firebase = useContext(FirebaseContext);

  const [userSesion, setUserSesion] = useState(null); // 2* si !== null
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // verification si nous avons un utilisateur 2*
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSesion(user) : props.history.push("/"); // ? user -> set(enregistreleUser) : (user introuvable) redirection ('/') pas user 3*
    }); // méthode listener qui consiste à verifier tout le temps .(connexion? deconnexion?)

    if (userSesion !== null) {
      // get les data
      firebase
        .user(userSesion.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData(myData);
          }
        })
        .catch((error) => {});
    }
    return () => {
      // (componentWillUnmount: demontage)
      listener();
    };
  }, [userSesion, firebase, props.history]);

  return userSesion === null ? ( // montage (null)  1*
    <Loader
      loadingMsg={"Authentification ..."}
      styling={{ textAlign: "center", color: "#FFFFFF" }}
    />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
