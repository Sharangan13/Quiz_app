import React, { useState } from "react";
import QuestionList from "../data/QuestionList.json";
import QuestionResult from "./QuestionResult";
import Question from "./Question";

function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(QuestionList.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);


////////////////////////////////////////////////////////////////////////////
  console.log(currentQuestionIndex);
  console.log(markedAnswers);
///////////////////////////////////////////////////////////////////////////


  function calculateResult() {
    let correct = 0;
    for (let index = 0; index < QuestionList.length; index++) {
      const question = QuestionList[index];

      if (Number(question.correctOptionIndex) === markedAnswers[index]) {
        correct++;

      
      }
    }
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  }

  const handleSetAnswer = (index) => {
    setMarkedAnswers((prevAnswers) => {
      let newArr = [...prevAnswers];
      newArr[currentQuestionIndex] = index;
      return newArr;
    });

    if (currentQuestionIndex + 1 < QuestionList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If it's the last question, show the result
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-screen">
      {showResult ? (
        <QuestionResult
          result={calculateResult()}
          retry={() => {
            // Reset the state to start the quiz again
            setCurrentQuestionIndex(0);
            setMarkedAnswers(new Array(QuestionList.length).fill(null));
            setShowResult(false);
          }}
        />
      ) : (
        <Question
          question={QuestionList[currentQuestionIndex]}
          totalQuestions={QuestionList.length}
          currentQuestion={currentQuestionIndex + 1}
          setAnswer={handleSetAnswer}
        />
      )}
    </div>
  );
}

export default QuizScreen;
