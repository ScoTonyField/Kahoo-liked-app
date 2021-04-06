import { Box, Button, Container, Grid } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from '../components/title/Title';
import PropTypes from 'prop-types';
import GameCard from '../components/GameCard';
import makeAPIRequest from '../Api';

const useStyles = makeStyles({
  btnGroups: {
    padding: '20px',
    textAlign: 'center',
  },

  button: {
    margin: '20px',
  },

  cardGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }

});

const Dashboard = (props) => {
  // const history = useHistory();
  console.log('dashboard token: ', props.token);
  const classes = useStyles();
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    if (props.token) {
      makeAPIRequest('admin/quiz', 'GET', props.token, null, null)
        .then(res => {
          res.quizzes.map((game) => setGames([...games, game]));
        }).catch((err) => {
          console.log('ERROR fetching quizzes: ', err);
          alert('Invalid Token. Fails to fetch games.');
        })
    }
  }, [])

  return (
    <Container>
      <Title>
        Dashboard
      </Title>
      {
        props.token
          ? (
            <Box>
              <Box className={classes.btnGroups}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary">
                  Create new game
                </Button>
              </Box>
              <Grid container className={classes.root}>
                  {
                    games.map((game) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                        <GameCard gameInfo={game} />
                      </Grid>
                    ))
                  }
              </Grid>
            </Box>
            )
          : (
              <p>You are not logged in, please login first.</p>
            )
      }

    </Container>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string,
};

export default Dashboard;
