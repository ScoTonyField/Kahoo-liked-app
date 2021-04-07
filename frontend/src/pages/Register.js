import React from 'react';
import { Container } from '@material-ui/core';
import Title from '../components/Titles/Title';
import PropTypes from 'prop-types';

const Register = (props) => {
  return (
    <Container>
      <Title>
        Register
      </Title>
    </Container>
  );
};

Register.propTypes = {
  setPage: PropTypes.func,
  setToken: PropTypes.func,
};

export default Register;
