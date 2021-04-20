import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import Lobby from './Lobby';
import GameAdminQuestion from './GameAdminQuestion';
import makeAPIRequest from '../Api';
import { List } from 'react-content-loader';

const GameAdminController = () => {
  const history = useHistory();
  const { sessionid: sessionId, quizid: quizId } = useParams();
  if (localStorage.getItem('token') === null) {
    return <p>You are not logged in</p>;
  }

  // current position
  const [quizPos, setQuizPos] = React.useState();
  const [timerActive, setTimerActive] = React.useState(false);

  // all the quiz data
  const [quiz, setQuiz] = React.useState({});
  // -1: lobby (not started), 0: in progress (started), 1: finish (ended)

  React.useEffect(() => {
    console.log('admin controller interval triggerd, fetch quiz status every 10sec')
    const fetchStatus = window.setInterval(() => {
      makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          console.log(res)
          setQuiz(res.results);
          localStorage.setItem('position', res.results.position);
          if (res.results.position < 0) {
            setTimerActive(false);
            setQuizPos(-1);
          } else if (res.results.position === res.results.questions.length) {
            setQuizPos(1);
          } else {
            setTimerActive(true);
            setQuizPos(0)
          }
        }).catch((err) => {
          console.log('ERROR: Fail to fetch quiz status', err)
        })
      console.log(new Date());
    }, 1000);
    return () => {
      console.log('stop interval in admin controller') // TODO: delete this
      clearInterval(fetchStatus)
    };
  }, [])
  // UX: if quiz has not been load, display content loader
  if (quiz === undefined || quizPos === undefined) return <List />
  // handle "view result" button
  const handleViewResult = () => history.push(`/results/${sessionId}`);

  const pauseTimer = () => setTimerActive(false);

  const handleNext = (nextStage) => {
    makeAPIRequest(`admin/quiz/${quizId}/advance`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log('to ', res.stage)
        console.log('next: ', nextStage)
        localStorage.setItem('position', res.stage);
        setTimerActive(true)
      }).catch(err => console.log('ERROR: Fail to advance quiz, ', err))
  }
  console.log(quiz)
  // render content depends on game state: lobby, question, result
  const renderContent = () => {
    console.log('timer: ', timerActive)
    switch (quizPos) {
      // if progress < 0, the game is at lobby state and should display joined player's name
      case -1:
        return <Lobby players={quiz.players} setQuizPos={setQuizPos}/>;

        // if progress == 0, the game is at question state
      case 0:
        return <GameAdminQuestion question={quiz.questions[quiz.position]} handleNext={handleNext} pauseTimer={pauseTimer} />

      // if progress > 0, the game is finished. Display result page
      case 1:
        return (
          <>
            <p> game end</p>
            <Button onClick={handleViewResult} variant="contained" color="primary">View Results</Button>
          </>
        )

      // should never reach
      default:
        return <p>ERROR: Invalid quiz position code {quizPos}</p>
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
