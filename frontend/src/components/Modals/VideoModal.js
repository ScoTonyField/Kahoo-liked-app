import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';

const VideoModal = ({ open, setOpen, defaultLink, setDefaultLink }) => {
  return (
    <Dialog open={open} aria-labelledby="simple-dialog-title">
      <DialogTitle id='video-title'>Youtube Link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Paste your url link of youtube video below (video only)
        </DialogContentText>
        <TextField
          id='videolink'
          name='videolink'
          placeholder='Video URL'
          fullWidth
          value={defaultLink}
          onChange={(event) => setDefaultLink(event.target.value)}
        ></TextField>
        <DialogActions>
          <Button variant='contained' color='primary' onClick={(event) => setOpen(false)}>OK</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

VideoModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  defaultLink: PropTypes.string,
  setDefaultLink: PropTypes.func,
};

export default VideoModal;
