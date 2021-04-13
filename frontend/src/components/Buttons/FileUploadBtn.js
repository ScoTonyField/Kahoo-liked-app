import React from 'react';
import {
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
`;

const FileUploadBtn = ({ fileType }) => {
  return (
    <div >
      <HiddenInput
        accept={fileType}
        id="file-upload-button"
        type="file"
      />
      <label htmlFor="file-upload-button">
        <Button variant="contained" color="primary" component='span'>
            Import
        </Button>
      </label>
    </div>
  );
};

FileUploadBtn.propTypes = {
  fileType: PropTypes.string,
};

export default FileUploadBtn;
