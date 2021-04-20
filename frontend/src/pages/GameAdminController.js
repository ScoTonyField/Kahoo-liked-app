import React from 'react';
import { Box, Button, Container } from '@material-ui/core';
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
    return <Title>You are not logged in</Title>;
  }

  // -1: lobby (not started), 0: in progress (started), 1: finish (ended)
  const [progress, setProgress] = React.useState();

  // all the quiz data
  const [quiz, setQuiz] = React.useState({});

  React.useEffect(() => {
    const fetchStatus = window.setInterval(() => {
      makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          setQuiz(res.results);
          localStorage.setItem('position', res.results.position);
          if (res.results.position < 0) setProgress(-1);
          else if (res.results.position === res.results.questions.length) setProgress(1);
          else setProgress(0)
        }).catch((err) => console.log('ERROR: Fail to fetch quiz status', err))
      console.log(new Date());
    }, 1000);
    return () => {
      console.log('stop interval in admin controller') // TODO: delete this
      clearInterval(fetchStatus)
    };
  }, [])
  // UX: if quiz has not been load, display content loader
  if (quiz === undefined || progress === undefined) return <List />

  // handle "view result" button
  const handleClick = () => history.push(`/results/${sessionId}`);

  // when player click 'next', advance the state
  const handleNext = () =>
    makeAPIRequest(`admin/quiz/${quizId}/advance`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => setProgress(res.stage))
      .catch(err => console.log('ERROR: Fail to advance quiz, ', err))

  // render content depends on game state: lobby, question, result
  const renderContent = () => {
    switch (progress) {
      // if progress < 0, the game is at lobby state and should display joined player's name
      case -1:
        return <Lobby players={quiz.players} handleNext={handleNext}/>;

      // if progress == 0, the game is at question state
      case 0:
        return <GameAdminQuestion progress={progress} question={quiz.questions[quiz.position]} handleNext={handleNext} />

      // if progress > 0, the game is finished. Display result page
      case 1:
        return (
          <Box align='center' p={20}>
            <Title>Game End</Title>
            <Button onClick={handleClick} variant="contained" color="primary">View Results</Button>
          </Box>
        )

      // if reach, it means that the react states are not up to date, display content loader
      default:
        return <List />
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
