import React from 'react';
import { Box, Card, CardContent, Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Subtitle from '../Titles/Subtitle';
import PropTypes from 'prop-types';

// import makeAPIRequest from '../../Api';

const Lobby = ({ players }) => {
  const { sessionid: sessionId } = useParams();
  console.log(players, sessionId)

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
  players: PropTypes.array
};

export default Lobby;
