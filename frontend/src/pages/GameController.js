import React from 'react';
import { Container } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import GamePlayPlayerView from '../components/Views/GamePlayPlayerView';
import GamePlayAdminView from '../components/Views/GamePlayAdminView';
import makeAPIRequest from '../Api';

const GameController = () => {
  const location = useLocation();
  // track entered players
  const [players, setPlayers] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false)
  const { sessionid: sessionId } = useParams();
  // determine if current user is admin
  React.useEffect(() => {
    if (location.pathname.includes('admin')) setIsAdmin(true);
    makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        setPlayers(res.results.players)
      }).catch(() => alert('ERROR: Fail to fetch quiz status'))
  }, [])

  // get session state
  console.log(players, setPlayers)
  return (
    <Container>
        <Title>Welcome to BigBrain!</Title>
        <Subtitle>Current Session: {sessionId}</Subtitle>
        {
          isAdmin
            ? <GamePlayAdminView players={players} />
            : <GamePlayPlayerView players={players} setPlayers={setPlayers} />
        }

    </Container>
  );
};

export default GameController;
