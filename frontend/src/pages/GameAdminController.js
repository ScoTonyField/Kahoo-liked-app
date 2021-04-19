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
  if (localStorage.getItem('token') === null) {
    return <p>You are not logged in</p>;
  }
  // current position
  const [quizPos, setQuizPos] = React.useState();

  // all the quiz data
  const [quiz, setQuiz] = React.useState({});
  // -1: lobby (not started), 0: in progress (started), 1: finish (ended)
  const { sessionid: sessionId } = useParams();

  React.useEffect(() => {
    console.log('admin controller interval triggerd, fetch quiz status every 10sec')
    const fetchStatus = window.setInterval(() => {
      makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          console.log(res)
          localStorage.setItem('position', res.results.position);
          if (res.results.position < 0) setQuizPos(-1);
          else if (res.results.position === res.results.questions.length) setQuizPos(1);
          else setQuizPos(0)
          setQuiz(res.results);
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
  if (!quiz || !quizPos) return <List />

  // handle "view result" button
  const handleClick = () => history.push(`/results/${sessionId}`);

  const handleNext = (nextStage) => {
    console.log('next: ', nextStage)
    localStorage.setItem('position', nextStage);
  }

  // render content depends on game state: lobby, question, result
  const renderContent = () => {
    switch (quizPos) {
      // if progress < 0, the game is at lobby state and should display joined player's name
      case -1:
        return <Lobby players={quiz.results.players} />;

        // if progress == 0, the game is at question state
      case 0:
        return <GameAdminQuestion question={quiz.questions[quiz.position]} setQuizPos={handleNext} />

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
