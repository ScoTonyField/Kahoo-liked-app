import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import makeAPIRequest from '../../Api';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CreateGameModal = ({ games, setGames }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [errorText, setErrorText] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for opening the 'create new game' modal
  const handleClickOpen = () => {
    setErrorText();
    setOpen(true);
  };

  // Handler for closing the 'create new game' modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handler for submitting the name to the new game
  const handleSubmit = () => {
    // Empty name is not allowed
    if (!name) {
      setErrorText('Quiz name cannot be empty.')
    } else {
      createNewGame(name);
      setOpen(false);
    }
  }

  const createNewGame = (value) => {
    const body = JSON.stringify({
      name: value
    })
    makeAPIRequest('admin/quiz/new', 'POST', localStorage.getItem('token'), null, body)
      .then((res) => {
        alert('Successfully create a new quiz!');
        return res;
      }).then((res) => setGames([...games, parseInt(res.quizId)])
      ).catch(err => {
        const errMsg = 'ERROR: Fail to create new quiz: ';
        if (err.status === 400) {
          alert(errMsg + 'Invalid input');
        } else if (err.status === 403) {
          alert(errMsg + 'Invalid token');
        } else {
          alert(errMsg + err);
        }
      });
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
      >
        Create a new quiz
      </Button>
        {/* XXX: accessibility: labelledby: https://material-ui.com/zh/components/modal/ */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="create-new-quiz-title"
      >
        <DialogTitle id="create-new-quiz-title">Create a new quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make a new quiz, please enter the name of the new game.
          </DialogContentText>
          <TextField
            autoFocus
            required
            label="Quiz Name"
            fullWidth
            error={Boolean(errorText)}
            helperText={errorText}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateGameModal.propTypes = {
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default CreateGameModal;
