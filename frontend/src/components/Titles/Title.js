import React from 'react';
import 'fontsource-roboto';
import PropTypes from 'prop-types';
import {
  Typography
} from '@material-ui/core';

const Title = (props) => (
  <Typography variant="h3" style={{ padding: '20px', textAlign: 'center' }}>
    { props.children }
  </Typography>

);

Title.propTypes = {
  children: PropTypes.node,
}

export default Title;
