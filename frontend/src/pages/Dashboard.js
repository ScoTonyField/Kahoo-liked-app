import { Box, Container, Grid } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import React from 'react';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import GameCard from '../components/GameCard';
import makeAPIRequest from '../Api';
import CreateGameModal from '../components/Modals/CreateGameModal';
import ImportModal from '../components/Modals/ImportModal';

const Dashboard = () => {
  // const history = useHistory();
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
                <Subtitle>You currently have {games.length} quizzes in total. Click them to edit the quiz.</Subtitle>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                p={3}
              >
                <Box p={1}>
                  <CreateGameModal setGames={setGames} games={games} />
                </Box>
                <Box p={1}>
                  <ImportModal setGames={setGames} games={games} />
                </Box>
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
