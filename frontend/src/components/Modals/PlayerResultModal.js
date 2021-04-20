import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PlayerResultTable from '../Tables/PlayerResultTable';

const PlayerResultModal = ({ player, questions }) => {
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
  console.log('-------', player)
  return (
    <div>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
        >
          View Stats
        </Button>
        <Dialog
          open={open}
          maxWidth={'lg'}
          fullWidth
          onClose={handleClose}
          fullScreen={fullScreen}
          aria-labelledby="player-result-title"
        >
            <DialogTitle id="player-result-title">Results for { player.name }</DialogTitle>
                <DialogContent>
                  <PlayerResultTable playerAnswers={player.answers} questions={questions} />
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
  player: PropTypes.object,
  questions: PropTypes.array,
};

export default PlayerResultModal;
