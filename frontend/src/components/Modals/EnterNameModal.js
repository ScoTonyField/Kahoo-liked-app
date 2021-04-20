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
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CreateGameModal = ({ name, setName, errText }) => {
  const [open, setOpen] = React.useState(false);
  const [errorText, setErrorText] = React.useState(errText);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for closing the 'create new game' modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handler for submitting the name to the new game
  const handleSubmit = () => {
    // Empty name is not allowed
    if (!name) {
      setErrorText('Name cannot be empty.')
    } else {
      setOpen(false);
    }
  }

  return (
    <div>
        {/* XXX: accessibility: labelledby: https://material-ui.com/zh/components/modal/ */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="enter-nickname"
      >
        <DialogTitle id="enter-nickname">Enter a nickname</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your nickname.
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
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateGameModal.propTypes = {
  setName: PropTypes.func,
  name: PropTypes.string,
  errText: PropTypes.string,
};

export default CreateGameModal;
