import React from 'react';
import { Box, Card, CardContent, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';
import makeAPIRequest from '../Api';

const Lobby = ({ setQuiz, setProgress, setQuizPos }) => {
  const [players, setPlayers] = React.useState([]);
  const { sessionid: sessionId } = useParams();

  React.useEffect(() => {
    console.log('lobby interval triggerd, fetch status every 10sec')
    const fetchStatus = window.setInterval(() => {
      makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          if (res.results.position < 0) {
            setPlayers(res.results.players)
          } else {
            setQuiz(res.results);
            setProgress(0);
          }
          localStorage.setItem('position', res.results.position);
          setQuizPos(res.results.position);
          if (!res.results.active) {
            setProgress(-1);
          }
        }).catch((err) => console.log('ERROR: Fail to fetch quiz status', err))
      console.log(new Date());
    }, 10000);
    return () => {
      console.log('stop interval in Lobby') // TODO: delete this
      clearInterval(fetchStatus)
    };
  }, [])

  return (
    <Container>
      <Subtitle>Waiting for players...</Subtitle>
      <div>
        {
          players.map((p, idx) => (
            <Box p={1} key={idx} >
              <Card elevation={1}>
                <CardContent>
                  {p}
                </CardContent>
              </Card>
            </Box>
          ))
        }
      </div>
    </Container>
  );
};

Lobby.propTypes = {
  setQuiz: PropTypes.func,
  setProgress: PropTypes.func,
  setQuizPos: PropTypes.func
};

export default Lobby;
