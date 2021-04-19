import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import Lobby from './Lobby';
import GameAdminQuestion from './GameAdminQuestion';

const GameAdminController = () => {
  const history = useHistory();
  if (localStorage.getItem('token') === null) {
    return <p>You are not logged in</p>;
  }
  // current position
  const [quizPos, setQuizPos] = React.useState();
  // all the quiz data
  const [quiz, setQuiz] = React.useState({});
  // -1: lobby (not started), 0: in progress (started), 1: finish (ended)
  const [progress, setProgress] = React.useState(-1);
  const { sessionid: sessionId } = useParams();

  React.useEffect(() => {
    if (!quizPos) setQuizPos(localStorage.getItem('position'));
    // finishing the game
    // if (quizPos === quiz.questions.length) setProgress(1);
  }, [])

  const handleClick = () => history.push(`/results/${sessionId}`);

  const handleNext = (nextStage) => {
    console.log('next: ', nextStage)
    setQuizPos(nextStage);
    localStorage.setItem('position', nextStage);
  }

  const renderContent = () => {
    switch (progress) {
      // if progress < 0, the game is at lobby state and should display joined player's name
      case -1:
        return <Lobby setQuizPos={setQuizPos} setQuiz={setQuiz} setProgress={setProgress} />;

      // if progress == 0, the game is at question state
      case 0:
        console.log(quiz.questions)
        console.log(quizPos)
        return <GameAdminQuestion question={quiz.questions[quizPos]} setQuizPos={handleNext} />

      // if progress > 0, the game is finished. Display result page
      case 1:
        return (
                  <>
                    <p> game end</p>
                    <Button onClick={handleClick} variant="contained" color="primary">View Results</Button>
                  </>
        )

      // should never reach
      default:
        return <p>ERROR: Invalid progress code</p>
    }
  }
  return (
    <Container>
        <Title>Welcome to BigBrain!</Title>
        <Subtitle>Current Session: {sessionId}</Subtitle>
        { renderContent() }
    </Container>
  );
};

export default GameAdminController;
