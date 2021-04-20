import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@material-ui/core';

const VideoModal = ({ open, setOpen, setDefaultMedia, setDefaultLink }) => {
  const [rawUrl, setRawUrl] = useState('');

  const getVideoPlay = (url) => {
    if (url) {
      const rules = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(rules)) {
        console.log(url.match(rules));
        setDefaultLink('https://www.youtube.com/embed/' + url.match(rules)[1]);
        setDefaultMedia('iframe');
        setOpen(false);
      } else {
        console.log('no match');
        alert('Invalid URL, please correct the link');
      }
    }
  }

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
          value={rawUrl}
          onChange={(event) => {
            setRawUrl(event.target.value);
            // setDefaultLink(event.target.value)
          }}
        ></TextField>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={(event) => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={(event) => {
              getVideoPlay(rawUrl);
              // setOpen(false);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

VideoModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setDefaultMedia: PropTypes.func,
  setDefaultLink: PropTypes.func,
};

export default VideoModal;
