import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import makeAPIRequest from '../../Api';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const closeBtnStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  color: 'grey',
};

const ToggleGameBtn = ({ gameId, sessionId, active, setActive }) => {
  const [open, setOpen] = React.useState(false);
  const [lastSessionId, setLastSessionId] = React.useState();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  // Handle 'copy' button to copy the link which contains the sesion id to the started game
  // TODO: maybe auto open the game page?
  const handleCopy = () => {
    navigator.clipboard.writeText(`localhost:3000/quiz/play/${sessionId}`)
      .then(() => {
        alert('Link coppied! Paste into brower and go to the game page.')
      }).catch(err => alert('Copied failed.', err));
  };

  // Handle 'view results' button to jump to the results page of the stopped game.
  const handleViewResults = () => {
    // TODO: view results
    history.push(`/results/${lastSessionId}`);
    setOpen(false);
  };

  /**
   * Handle start game button to start a game.
   * After starting the game, open the modal to display session id, and active the game card
   */
  const handleStart = () =>
    makeAPIRequest(`admin/quiz/${gameId}/start`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log(sessionId)
        setOpen(true);
        setActive(true);
      }).catch(() => alert('ERROR: Fail to start a game'));

  const handleOpen = () => setOpen(true)

  /**
   * Handle stop game button to stop a game.
   * Before stopping the game, store the session id of the game.
   * After stopping the game, open modal to ask if user wants to view results, and deactive the game card
   */
  const handleStop = () => {
    console.log('Stoping ' + gameId)
    setLastSessionId(sessionId);
    makeAPIRequest(`admin/quiz/${gameId}/end`, 'POST', localStorage.getItem('token'), null, null)
      .then(() => {
        setOpen(true);
        setActive(false);
      }).catch((err) => console.log('ERROR: Fail to end a game', err));
  }

  return (
    <div>
      {
        active
          ? (
            <>
              <Button size="medium" color="primary" onClick={handleOpen}>
                Link
              </Button>
              <Button size="medium" color="primary" onClick={handleStop}>
                  Stop
              </Button>
            </>
            )
          : (
            <Button size="medium" color="primary" onClick={handleStart}>
              Start
            </Button>
            )
      }
      <Dialog
        onClose={handleClose}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="active-game-title"
        open={open}
      >
        <DialogTitle id="active-game-title">
          { `The game has been ${active ? 'start' : 'stopped'} :D` }
          <IconButton aria-label="close" style={closeBtnStyle} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {
              active
                ? sessionId === null
                    ? 'Loading...'
                    : `Session id: ${sessionId}`
                : 'Would you like to view results?'
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          {
            active
              ? (
                <>
                  <Button
                    autoFocus
                    variant="contained"
                    onClick={handleCopy}
                    color="primary"
                  >
                    Copy Player Link
                  </Button>
                  <Button
                    component={Link}
                    to={`quiz/play/admin/${gameId}/${sessionId}`}
                    autoFocus
                    variant="contained"
                    color="primary"
                  >
                    Go to admin quiz controller
                  </Button>
                </>
                )
              : (
                <Button
                  autoFocus
                  variant="contained"
                  onClick={handleViewResults}
                  color="primary"
                >
                  View Results
                </Button>
                )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};

ToggleGameBtn.propTypes = {
  gameId: PropTypes.number,
  sessionId: PropTypes.number,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default ToggleGameBtn;
