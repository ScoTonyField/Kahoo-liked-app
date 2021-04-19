import React from 'react';
import { Container } from '@material-ui/core';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';
import makeAPIRequest from '../Api';
import JoinGameInput from '../components/JoinGameInput';

const JoinGame = ({ setPlayerId, setProgress }) => {
  React.useEffect(() => {
    // if the current browser has joined as a player
    // if player has joined the quiz, keep fetching game status to wait for start
    if (localStorage.getItem('player')) {
      const playerInfo = JSON.parse(localStorage.getItem('player'));
      const fetchQ = window.setInterval(() => {
        makeAPIRequest(`play/${playerInfo.id}/status`, 'GET', null, null, null)
          .then(res => {
            console.log(res)
            playerInfo.progress = 0;
            localStorage.setItem('player', JSON.stringify(playerInfo));
            setProgress(res.started ? 0 : -1);
          }).catch(() => {
            console.log('ERROR: Quiz is not active has been ended.');
            // if the game has finished, remove the player and display player results
            // if (question !== undefined) {
            //   localStorage.removeItem('player');
            //   history.push(`/results/player/${playerId}`);
            // }
          });
      }, 10000); // TODO: Change this to 1000 ms
      // setPlayerId(playerid);
      return () => {
        console.log('clear interval in join game')
        clearInterval(fetchQ);
      }
    }
  }, [])

  return (
    <Container>
      <Subtitle>Waiting for other players...</Subtitle>
      <div>
        {
          localStorage.getItem('player')
            ? <JoinGameInput setPlayerId={setPlayerId} />
            : <Subtitle>Nickname: {JSON.parse(localStorage.getItem('player')).nickname}</Subtitle>
        }
      </div>
    </Container>
  );
};

JoinGame.propTypes = {
  setPlayerId: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default JoinGame;
