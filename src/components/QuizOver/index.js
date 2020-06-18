import React, { Fragment, useEffect, useState } from "react";

import axios from "axios";

import { GiPodiumWinner } from "react-icons/gi";

import Loader from "../Loader";
import Modal from "../Modal";

//              cdu&cdm
const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;

  // console.log(props);
  // console.log(ref);

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  // console.log(API_PUBLIC_KEY);
  const hash = "234f9875e6df6c2bc98658291b3c9cd8";

  const [asked, setAsked] = useState([]); // console.log(asked);
  const [openModal, setOpenModal] = useState(false);
  const [characterInfos, setCharacterInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAsked(ref.current);
    // rafraichir les localStorage
    if (localStorage.getItem("marvelStorageDate")) {
      // verification key localStorage
      const data = localStorage.getItem("marvelStorageDate");
      checkDataAge(data); // verifie si la data à moin de 15jours
    }
  }, [ref]);

  const checkDataAge = (date) => {
    const today = Date.now();

    const timeDifference = today - date; // difference en ms

    const daysDifference = timeDifference / (1000 * 3600 * 24); // transforme en Jour

    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now()); // new date
    }
  };

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log(response);
          setCharacterInfos(response.data);
          setLoading(false);
          //                 enregistrer la data :setItem
          localStorage.setItem(id, JSON.stringify(response.data));
          //                  reccuperer de la data : getItem
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now()); // depuis le 1er janvier 1970 en ms
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const capitalizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    // setTimeout(() => {
    //   loadLevelQuestions(0);
    // }, 3000);
    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 3000);
  }

  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg"> Bravo, passer au niveau suivant !</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                <GiPodiumWinner size="50px" />
                Bravo, vous êtes un expert !
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );
  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button
                onClick={() => showModal(question.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"pas de réponses!"}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );
  //
  //
  //
  //
  //

  const resultInModal = !loading ? (
    <Fragment>
      <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={
              characterInfos.data.results[0].thumbnail.path +
              "." +
              characterInfos.data.results[0].thumbnail.extension
            }
            alt={characterInfos.data.results[0].name}
          />

          <p>{characterInfos.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterInfos.data.results[0].description ? (
            <p>{characterInfos.data.results[0].description}</p>
          ) : (
            <p>Description indisponible ...</p>
          )}

          <h3>Plus d'infos</h3>

          {/* condition verification de urls */}
          {characterInfos.data.results[0].urls &&
            characterInfos.data.results[0].urls.map((url, index) => {
              return (
                <a
                  key={index}
                  href={url.url}
                  target="_blank"
                  rel="noopenner noreferrer"
                >
                  {capitalizeFirstletter(url.type)}
                </a>
              );
            })}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={closeModal}>
          Fermer
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="modalHeader">
        <h2>Réponse de Marvel</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {decision}

      <hr />
      <p>Les réponses aux questions posées:</p>
      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
      <Modal showModal={openModal} closeModal={closeModal}>
        {resultInModal}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
