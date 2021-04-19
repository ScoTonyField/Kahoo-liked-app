import React from 'react';
import { Box, Card, CardContent, Container } from '@material-ui/core';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';

const Lobby = ({ players }) => {
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
