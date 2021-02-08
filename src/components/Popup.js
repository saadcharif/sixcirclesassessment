import React from "react";

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: "start",
      title: "Six Cirles Assessment Task",
      text:
        "Quiz by Saad Charif Tribak. <br /><br /> Unfinished task <br /><br /> Could not finish or fix the errors within the 4 hours, although will be working on them after submission",
      buttonText: "Start "
    };

    this.popupHandle = this.popupHandle.bind(this);
  }

  popupHandle() {
    let { time } = this.state;

    if (time === "start") {
      this.setState({
        time: "end",
        title: "End of the quiz!",
        buttonText: "Try Again"
      });

      this.props.startQuiz();
    } else {
      window.location.reload();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.score !== prevProps.score) {
      this.setState({
        text:
          "You have completed the quiz. <br /> You got: <strong>" +
          this.props.score +
          "</strong> out of <strong>" +
          this.props.total +
          "</strong> correct answers."
      });
    }
  }

  createMarkup(text) {
    return { __html: text };
  }

  render() {
    let { title, text, buttonText } = this.state;

    let { style } = this.props;

    return (
      <div className="popup-container" style={style}>
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <div className="popup">
              <h1>{title}</h1>
              <p dangerouslySetInnerHTML={this.createMarkup(text)} />
              <button className="fancy-btn" onClick={this.popupHandle}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
