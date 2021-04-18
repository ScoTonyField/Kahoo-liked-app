import React from 'react';
import { Button, Container } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import Lobby from '../components/Views/Lobby';
import makeAPIRequest from '../Api';

const GameController = () => {
  const history = useHistory();
  if (localStorage.getItem('token') === null) {
    return <p>You are not logged in</p>;
  }
  // track entered players
  const [players, setPlayers] = React.useState([]);
  const [quizPos, setQuizPos] = React.useState();
  const [question, setQuestion] = React.useState({});
  const [end, setEnd] = React.useState(false);
  const { sessionid: sessionId } = useParams();

  React.useEffect(() => {
    const fetchQ = window.setInterval(() => {
      makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          console.log(res)
          if (!res.results.active) {
            setEnd(true);
          }
          if (res.results.position < 0) {
            setPlayers(res.results.players)
          } else if (res.results.position === res.results.questions.length) {
            setEnd(true);
          } else {
            setQuestion(res.results.questions[res.results.position]);
          }
          setQuizPos(res.results.position);
        }).catch((err) => console.log('ERROR: Fail to fetch quiz status', err))
    }, 10000);
    return () => clearInterval(fetchQ);
  }, [])

  // get session state
  console.log(players, quizPos);

  const handleClick = () => history.push(`/results/${sessionId}`);
  return (
    <Container>
        <Title>Welcome to BigBrain!</Title>
        <Subtitle>Current Session: {sessionId}</Subtitle>
        {
          end
            ? (
                <>
                  <p> game end</p>
                  <Button onClick={handleClick} variant="contained" color="primary">View Results</Button>
                </>
              )
            : (quizPos < 0)
                ? <Lobby players={players} />
                : (
                    <>
                      Q: {JSON.stringify(question)}
                    </>
                  )
        }
    </Container>
  );
};

export default GameController;
