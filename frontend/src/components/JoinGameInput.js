import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const JoinGameInput = ({ setPlayerId, setProgress }) => {
  const { sessionid: sessionId } = useParams();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (event) => setValue(event.target.value);

  // join the person. Triggered when "Confirmed" is clicked, does not check duplicate name
  const handleConfirm = () => {
    // if the name has been taken
    if (value === '') {
      setError('Nickname cannot be empty.')
    } else {
      const body = JSON.stringify({
        name: value
      })
      makeAPIRequest(`play/join/${sessionId}`, 'POST', null, null, body)
        .then(res => {
          localStorage.setItem('player', JSON.stringify({
            sessionid: sessionId,
            nickname: value,
            id: res.playerId,
            progress: -1,
          }));
          setPlayerId(res.playerId);
        }).catch(() => {
          alert('The game has been started, you are not allowed to join.')
          // console.log('ERROR: Fail to join player', err) //TODO: delete this
        });
    }
  }
  return (
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
  );
};

JoinGameInput.propTypes = {
  setProgress: PropTypes.func,
  setPlayerId: PropTypes.func
};

export default JoinGameInput;
