import React, { Component } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QuizMarvel } from "../QuizMarvel";

import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import Question from "../Questions";
import QuizOver from "../QuizOver/index";

import { FaChevronRight } from "react-icons/fa";

toast.configure();

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestion: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null,
};

const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    // Reccupere les question dans un array
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      //le current contient les reponses
      this.storedDataRef.current = fetchedArrayQuiz; // stockage de l'array

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({ storedQuestion: newArray });
    }
  };

  showToastMsg = (pseudo) => {
    if (this.state.showWelcomeMsg === false) {
      // verrouillage de la notif

      this.setState({ showWelcomeMsg: true });

      toast.dark(`Bienvenue ${pseudo} LETS GO!!!!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast-dark",
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      // end
      // this.gameOver();

      this.setState({ quizEnd: true });
    } else {
      this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }));
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      // si l'user rep good
      this.setState((prevState) => ({
        score: prevState.score + 1, // + 1 point
      }));

      toast.success("Bravo tu es un MONSTRE!! + 1", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast-success",
      });
    } else {
      toast.error("LOL tu es un looser! 0", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "toastify-color",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // Destructuring
    const {
      maxQuestions,
      storedQuestion,
      idQuestion,
      score,
      quizEnd,
    } = this.state;

    if (storedQuestion !== prevState.storedQuestion && storedQuestion.length) {
      this.setState({
        question: storedQuestion[idQuestion].question,
        options: storedQuestion[idQuestion].options,
      });
    }

    if (idQuestion !== prevState.idQuestion && storedQuestion.length) {
      this.setState({
        question: storedQuestion[idQuestion].question, // nouvelle question
        options: storedQuestion[idQuestion].options, // reponse relative à la 1ere question
        userAnswer: null, // vider la reponse
        btnDisabled: true, // cacher le button
      });
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
    if (quizEnd !== prevState.quizEnd) {
      // console.log(this.state.score);
      const gradePercent = this.getPercentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };

  render() {
    // Destructuring
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent,
    } = this.state;
    // const { pseudo } = this.props.userData;

    const displayOption = options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            userAnswer === option ? "selected" : null
          } `}
          onClick={() => this.submitAnswer(option)}
        >
          <FaChevronRight /> {option}
        </p>
      );
    });

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <div>
        <Levels levelNames={levelNames} quizLevel={quizLevel} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <Question
          question={question}
          displayOption={displayOption}
          nextQuestion={this.nextQuestion}
          btnDisabled={btnDisabled}
          idQuestion={idQuestion}
          maxQuestions={maxQuestions}
        />
      </div>
    );
  }
}

export default Quiz;
