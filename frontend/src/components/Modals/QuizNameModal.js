import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';

const QuizNameModal = ({ open, setOpen, defaultName, setDefaultName, handleNameChange, setNameChanged }) => {
  return (
    <Dialog open={open} aria-labelledby="simple-dialog-title" fullWidth maxWidth={'sm'}>
      <DialogTitle id='video-title'>Edit Quiz Name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter new quiz name :)
        </DialogContentText>
        <TextField
          id='quizname'
          name='quizname'
          label="New Quiz Name"
          fullWidth
          required
          error={defaultName === ''}
          helperText={defaultName === '' && 'Quiz name cannot be empty'}
          value={defaultName}
          onChange={(event) => setDefaultName(event.target.value)}
        ></TextField>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={(event) => setOpen(false)}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={(event) => { setNameChanged(true); handleNameChange(); } }>OK</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

QuizNameModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  defaultName: PropTypes.string,
  setDefaultName: PropTypes.func,
  handleNameChange: PropTypes.func,
  setNameChanged: PropTypes.func,
};

export default QuizNameModal;
