import React from "react";
import quiz from "./data/quiz";
import Answers from "./components/Answers";
import Popup from "./components/Popup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nr: 0,
      total: quiz.length,
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "flex",
      question: quiz[0].question,
      answers: [
        quiz[0].answers[0],
        quiz[0].answers[1],
        quiz[0].answers[2],
        quiz[0].answers[3]
      ],
      correct: quiz[0].correct
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
  }

  pushquiz(nr) {
    this.setState({
      question: quiz[nr].question,
      answers: [
        quiz[nr].answers[0],
        quiz[nr].answers[1],
        quiz[nr].answers[2],
        quiz[nr].answers[3]
      ],
      correct: quiz[nr].correct,
      nr: this.state.nr + 1
    });
  }

  nextQuestion() {
    let { nr, total } = this.state;

    if (nr === total) {
      this.setState({
        displayPopup: "flex"
      });
    } else {
      this.pushquiz(nr);
      this.setState({
        showButton: false,
        questionAnswered: false
      });
    }
  }

  handleShowButton() {
    this.setState({
      showButton: true,
      questionAnswered: true
    });
  }

  handleStartQuiz() {
    this.setState({
      displayPopup: "none",
      nr: 1
    });
  }

  handleIncreaseScore() {
    this.setState({
      score: this.state.score + 1
    });
  }

  render() {
    let {
      nr,
      total,
      question,
      answers,
      correct,
      showButton,
      questionAnswered,
      displayPopup,
      score
    } = this.state;

    return (
      <div className="container">
        <Popup
          style={{ display: displayPopup }}
          score={score}
          total={total}
          startQuiz={this.handleStartQuiz}
        />

        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <div id="question">
              <h4>
                Question {nr}/{total}
              </h4>
              <p>{question}</p>
            </div>
            <Answers
              answers={answers}
              correct={correct}
              showButton={this.handleShowButton}
              isAnswered={questionAnswered}
              increaseScore={this.handleIncreaseScore}
            />
            <div id="submit">
              {showButton ? (
                <button className="fancy-btn" onClick={this.nextQuestion}>
                  {nr === total ? "Finish quiz" : "Next question"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
