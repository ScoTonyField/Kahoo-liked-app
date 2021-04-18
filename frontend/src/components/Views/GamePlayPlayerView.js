import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Subtitle from '../Titles/Subtitle';
import PropTypes from 'prop-types';
import makeAPIRequest from '../../Api';
// import makeAPIRequest from '../../Api';

const GamePlayPlayerView = ({ players, setPlayers }) => {
  const { sessionid: sessionId } = useParams();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [playerId, setPlayerId] = React.useState();
  // get session state
  React.useEffect(() => {
    // makeAPIRequest(`admin/session/${sessionId}/status`)
    if (localStorage.getItem('player')) {
      setPlayerId(JSON.parse(localStorage.getItem('player')).id);
    }
  }, [])

  const joinPlayer = () => {
    const body = JSON.stringify({
      name: value
    })
    makeAPIRequest(`play/join/${sessionId}`, 'POST', null, null, body)
      .then(res => {
        setPlayerId(res.playerId);
        setPlayers([...players, name]);
        localStorage.setItem('player', JSON.stringify({
          nickname: value,
          id: res.playerId,
        }))
      }).catch(() => alert('ERROR: Fail to join player'));
  }

  const handleChange = (event) => setValue(event.target.value);
  const handleConfirm = () => {
    // if the name has been taken
    if (value === '') {
      setError('Nickname cannot be empty.')
    } else if (players.indexOf(value) > -1) {
      setError('Nickname has been taken.')
    } else {
      joinPlayer();
    }
  }
  console.log('playerid: ', playerId)
  return (
    <>
      {
        playerId === undefined
          ? (
              <Box
                display='flex'
                flexDirection="column"
                width='50%'
                m={'auto'}
                p={2}
              >
                <Box m={1}>
                  <TextField
                    required
                    fullWidth
                    value={value}
                    label="Enter your nickname"
                    vairant="outlined"
                    onChange={handleChange}
                    error={error !== ''}
                    helperText={error}
                    size='medium'
                  />
                </Box>
                <Box m={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </Button>

                </Box>
              </Box>
            )
          : (
              <Subtitle>Nickname: {JSON.parse(localStorage.getItem('player')).nickname}</Subtitle>
            )
      }
    </>
  );
};

GamePlayPlayerView.propTypes = {
  players: PropTypes.array,
  setPlayers: PropTypes.func,
};

export default GamePlayPlayerView;
