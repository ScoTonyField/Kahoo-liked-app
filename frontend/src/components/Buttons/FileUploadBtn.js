import React from 'react';
import {
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const ImportModal = () => {
  return (
    <div >
      <HiddenInput
        accept=".csv,.json"
        id="file-upload-button"
        type="file"
      />
      <label htmlFor="file-upload-button">
        <Button variant="outlined" color="primary" component="span">
            Import
        </Button>
      </label>
    </div>
  );
};

ImportModal.propTypes = {
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default ImportModal;
