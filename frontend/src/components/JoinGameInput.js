import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';

const JoinGameInput = ({ sessionId, setPlayerId }) => {
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
            nickname: value,
            id: res.playerId,
          }));
          setPlayerId(res.playerId);
        }).catch((err) => console.log('ERROR: Fail to join player', err));
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
  sessionId: PropTypes.string,
  setPlayerId: PropTypes.func
};

export default JoinGameInput;
