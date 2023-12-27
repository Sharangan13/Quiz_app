import Navbar from "./components/Navbar"
import {useState} from 'react'
import QuizScreen from "./components/QuizScreen"
import JoinScreen from "./components/JoinScreen"


function App (){

  const [isQuizStated, setIsQuizStated] = useState(false)


  return(
    <>
    <Navbar/>
    
    <div className="quiz-containar">

      {
        isQuizStated? ( <QuizScreen retry={()=>isQuizStated(false)} />):( <JoinScreen start={()=>setIsQuizStated(true)}/> )
      }
    </div>
    
    </>
  )

}
export default App