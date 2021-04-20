import React from 'react';
import { Box, Button, Card, CardContent, Container } from '@material-ui/core';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import makeAPIRequest from '../Api';

const Lobby = ({ players, setQuizPos }) => {
  const { quizid: quizId } = useParams();

  // start the game
  const handleStart = () =>
    makeAPIRequest(`admin/quiz/${quizId}/advance`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log('to ', res.stage)
        setQuizPos(0)
      }).catch(err => console.log('ERROR: Fail to advance quiz, ', err))

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
      <Button
        variant="contained"
        onClick={handleStart}
      >
        Start
      </Button>
    </Container>
  );
};

Lobby.propTypes = {
  setQuizPos: PropTypes.func,
  players: PropTypes.array
};

export default Lobby;
