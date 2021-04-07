import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import makeAPIRequest from '../../Api';
import PropTypes from 'prop-types';

const closeBtnStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  color: 'grey',
};

const StartGameBtn = ({ gameId, sessionId, active, setActive }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionId)
      .then(() => {
        alert('Link coppied! Paste into brower and go to the game page.')
      }).catch(err => alert('Copied failed.', err));

    setOpen(false);
  };

  const handleViewResults = () => {
    // TODO: view results
    history.push(`/results/${sessionId}`);
    setOpen(false);
  };

  const handleStart = () =>
    makeAPIRequest(`admin/quiz/${gameId}/start`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log(sessionId)
        setActive(true);
        setOpen(true);
      }).catch(() => alert('ERROR: Fail to start a game'));

  const handleStop = () => {
    console.log('Stoping ' + gameId)
    makeAPIRequest(`admin/quiz/${gameId}/end`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log(res);
        setActive(false);
        setOpen(true);
      }).catch((err) => console.log('ERROR: Fail to end a game', err));
  }

  return (
    <div>
      {
        active
          ? (
            <Button size="medium" color="primary" onClick={handleStop}>
                Stop
            </Button>
            )
          : (
            <Button size="medium" color="primary" onClick={handleStart}>
              Start
            </Button>
            )
      }
      <Dialog
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
        aria-labelledby="active-game-title"
        open={open}
      >
        <DialogTitle id="active-game-title">
          { active ? 'The game has been started! :D' : 'Game'
          <IconButton aria-label="close" style={closeBtnStyle} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {
              active ? `Session id: ${sessionId}` : 'Would you like to view results?'
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          {
            active
              ? (
                <Button autoFocus variant="contained" onClick={handleCopy} color="primary" >
                  Copy Link
                </Button>
                )
              : (
                <Button autoFocus variant="contained" onClick={handleViewResults} color="primary" >
                  View Results
                </Button>
                )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};

StartGameBtn.propTypes = {
  gameId: PropTypes.number,
  sessionId: PropTypes.number,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default StartGameBtn;
