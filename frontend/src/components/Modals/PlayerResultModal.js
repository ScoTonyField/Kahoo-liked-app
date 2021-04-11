import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const PlayerResultModal = ({ name }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for opening the 'create new game' modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler for closing the 'create new game' modal
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
        <Button onClick={handleClickOpen}></Button>
        <Dialog
          open={open}
          onCLose={handleClose}
          fullScreen={fullScreen}
          aria-labelledby="player-result-title"
        >
            <DialogTitle id="player-result-title">Results for { name }</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To make a new quiz, please enter the name of the new game.
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            </DialogActions>
        </Dialog>

    </div>
  );
};

PlayerResultModal.propTypes = {
  name: PropTypes.string,
};

export default PlayerResultModal;
