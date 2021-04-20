import React from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Title from '../components/Titles/Title';

const SessionJoin = () => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useHistory();

  const handleChange = (event) => setValue(event.target.value);

  // jump to session page Triggered when "Confirmed" is clicked, does not check duplicate name
  const handleConfirm = () => {
    // if the name has been taken
    if (value === '') {
      setError('Nickname cannot be empty.');
    } else {
      history.push(`/quiz/play/${value}`);
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
    <Title>Please enter session id</Title>
    <Box m={1}>
        <TextField
        required
        fullWidth
        value={value}
        label="Enter session id"
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

export default SessionJoin;
