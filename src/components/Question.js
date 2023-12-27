import { useState, useEffect, useRef } from "react";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  function GotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setAnswer(selectedOption);
    setSelectedOption(null);
  }

  useEffect(() => {
    progressBar.current.classList.remove("active");

    const timerId = setTimeout(() => {
      progressBar.current.classList.add("active");
      GotoNextQuestion();
    }, 10000);

    // Cleanup function to clear the timer when the component unmounts or a new question is displayed
    return () => {
      clearTimeout(timerId);
    };
  }, [question, GotoNextQuestion, setAnswer]);

  return (
    <div className="question">
      <div className="progress-bar" ref={progressBar}></div>
      <div className="question-count">
        <b> {currentQuestion} </b> of <b> {totalQuestions} </b>
      </div>

      <div className="main">
        <div className="title">
          <span>question: </span>
          <p>{question.title}</p>
        </div>

        <div className="option">
          {question.option.map((option, index) => (
            <div
              className={index === selectedOption ? "option active" : "option"}
              key={index}
              onClick={() => setSelectedOption(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="control">
        <button onClick={GotoNextQuestion}>Next</button>
      </div>
    </div>
  );
}

export default Question;
