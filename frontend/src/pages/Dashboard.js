import { Box, Container, Grid } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import GameCard from '../components/GameCard';
import makeAPIRequest from '../Api';
import CreateGameModal from '../components/Modals/CreateGameModal';

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

const Dashboard = () => {
  // const history = useHistory();
  const classes = useStyles();
  const gamesId = [];

  // games contains a list of quiz id (not quiz object)
  const [games, setGames] = React.useState([]);
  const tmp = [];

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      makeAPIRequest('admin/quiz', 'GET', localStorage.getItem('token'), null, null)
        .then(res => {
          res.quizzes.map(quiz => gamesId.push(quiz.id))
          gamesId.map((gid) =>
            tmp.push(gid)
          )
          setGames(tmp);
        }).catch(err => console.log('Error fetching quizzes id: ', err)
        )
    }
  }, [])

  return (
    <Container >
      <Title>
        Dashboard
      </Title>
      {
        localStorage.getItem('token')
          ? (
            <Box>
              <Box className={classes.btnGroups}>
                <Subtitle>You currently have {games.length} quizzes in total. Click them to edit the quiz.</Subtitle>
                <CreateGameModal setGames={setGames} games={games} />
              </Box>
              <Grid container>
                  {
                    games.map((game) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={game}>
                          <GameCard gid={game} games={games} setGames={setGames}/>
                        </Grid>
                      )
                    })
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

export default Dashboard;
