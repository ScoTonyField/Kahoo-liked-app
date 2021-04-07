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
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import makeAPIRequest from '../../Api';

const useStyles = makeStyles({
  button: {
    margin: '20px',
  },
});

const CreateGameModal = ({ games, setGames }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!name) {
      alert('The name of a quiz cannot be empty!');
    } else {
      createNewGame(name);
      setOpen(false);
    }
  }

  const insertNewGame = (id) =>
    makeAPIRequest(`admin/quiz/${id}`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        res.id = parseInt(id);
        setGames([...games, res])
      })
      .catch(err => alert('Error adding new game: ', err));

  const createNewGame = (value) => {
    const body = JSON.stringify({
      name: value
    })
    makeAPIRequest('admin/quiz/new', 'POST', localStorage.getItem('token'), null, body)
      .then((res) => {
        alert('Successfully create a new quiz!');
        return res;
      }).then((res) => insertNewGame(res.quizId)
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
            className={classes.button}
            onClick={handleClickOpen}
            variant="outlined"
            color="primary">
            Create a new quiz
        </Button>
        {/* XXX: accessibility: labelledby: https://material-ui.com/zh/components/modal/ */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="create-new-quiz-title">
        <DialogTitle id="create-new-quiz-title">Create a new quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make a new quiz, please enter the name of the new game.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quiz Name"
            type="text"
            fullWidth
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
