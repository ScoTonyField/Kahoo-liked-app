import React from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@material-ui/core';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../components/Titles/Title';

const useStyles = makeStyles({
  root: {
    width: 250
  }
});

const LobbyAdmin = ({ players, handleNext }) => {
  const classes = useStyles();

  return (
    <Container>
      <Title color='#303F9F'>{'> Lobby < '}</Title>
      <Subtitle color='#303F9F'>Join with this link: <b>localhost:3000/quiz/play</b></Subtitle>
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
      >
        <Box p={1}>
          <Button
            variant="contained"
            onClick={handleNext}
            color="primary"
            size="large"
          >
            Start
          </Button>
        </Box>
        <Subtitle color='#303F9F'>Waiting for players...</Subtitle>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
      >
        {
          players.map((p, idx) => (
            <Box p={1} key={idx}>
              <Card elevation={4} className={classes.root}>
                <CardContent>
                  <Typography variant='h4'>{p}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        }
      </Box>
    </Container>
  );
};

LobbyAdmin.propTypes = {
  handleNext: PropTypes.func,
  players: PropTypes.array
};

export default LobbyAdmin;
