import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import GameHistoryTable from '../Tables/GameHistoryTable';

const GameHistory = ({ name, history }) => {
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
        <Button onClick={handleClickOpen}>History</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth={'lg'}
          fullScreen={fullScreen}
          aria-labelledby="quiz-history-title"
        >
            <DialogTitle id="quiz-history-title">History for { name }. Click to view results.</DialogTitle>
                <DialogContent>
                  <GameHistoryTable history={history} />
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

GameHistory.propTypes = {
  name: PropTypes.string,
  history: PropTypes.array,
};

export default GameHistory;
