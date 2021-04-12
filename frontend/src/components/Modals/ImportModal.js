import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styleBtn = styled({ Button })`
    margin: 20px;
`;

const ImportModal = ({ games, setGames }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for opening the 'import gmae data' modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler for closing the 'import gmae data' modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handler for submitting the data to create new game
  const handleSubmit = () => {
    setOpen(false);
  }
  return (
    <div>
       <styleBtn
            onClick={handleClickOpen}
            variant="outlined"
            color="primary">
            Create a new quiz
        </styleBtn>
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
};

ImportModal.propTypes = {
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default ImportModal;
