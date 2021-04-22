import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Subtitle from '../components/Titles/Subtitle';
import PropTypes from 'prop-types';
import makeAPIRequest from '../Api';
import JoinGameInput from '../components/JoinGameInput';

const LobbyPlayer = ({ setPlayerId, setProgress }) => {
  const { sessionid: sessionId } = useParams();

  React.useEffect(() => {
    // if the current browser has joined as a player
    // if player has joined the quiz, keep fetching game status to wait for start
    if (localStorage.getItem('player') !== null && sessionId === JSON.parse(localStorage.getItem('player')).sessionid) {
      // check if session id is the same, if not, means player changed to a new game
      console.log(localStorage.getItem('player'));
      const playerInfo = JSON.parse(localStorage.getItem('player'));
      const fetchQ = window.setInterval(() => {
        makeAPIRequest(`play/${playerInfo.id}/status`, 'GET', null, null, null)
          .then(res => {
            if (res.started === true) {
              playerInfo.progress = 0;
              localStorage.setItem('player', JSON.stringify(playerInfo));
              setProgress(0);
            }
          }).catch(() => {
            console.log('ERROR: Quiz is not active has been ended.');
          });
      }, 1000);
      return () => {
        console.log('clear interval in join game')
        clearInterval(fetchQ);
      }
    } else {
      return <JoinGameInput setProgress={setProgress} setPlayerId={setPlayerId} />
    }
  }, [localStorage.getItem('player')])

  return (
    <Container>
      <Subtitle color='#303F9F'><b>{'> Lobby <'}<br/>Waiting for other players...</b></Subtitle>
      <div>
        {
          localStorage.getItem('player') === null || sessionId !== JSON.parse(localStorage.getItem('player')).sessionid
            ? <JoinGameInput setProgress={setProgress} setPlayerId={setPlayerId} />
            : <Subtitle color='#303F9F'>Your Nickname: {JSON.parse(localStorage.getItem('player')).nickname}</Subtitle>
        }
      </div>
      <img src="https://64.media.tumblr.com/8210fd413c5ce209678ef82d65731443/tumblr_mjphnqLpNy1s5jjtzo1_400.gifv"/>

    </Container>
  );
};

LobbyPlayer.propTypes = {
  setPlayerId: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default LobbyPlayer;
