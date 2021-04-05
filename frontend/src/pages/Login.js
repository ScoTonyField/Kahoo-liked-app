import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import 'fontsource-roboto';

import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
// import styles from './styles.css';
import Title from '../components/title/Title';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const validateInput = (values) => {
  const errors = {};

  // check email
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  // check password
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8 || values.password.length > 50) {
    errors.password = 'Password can only be between 8 and 50 characters.'
  }

  return errors;
}

const Login = ({ setToken, setPage }) => {
  // const classes = useStyles();
  const history = useHistory();

  const handleLogin = (values) => {
    // handle values
    setToken('token');
    setPage('dashboard');
    history.push('/dashboard');
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledLayout>
        <Title>Sign in</Title>
        <Formik
          initialValues={{
            email: 'test@test.com',
            password: '12345678'
          }}
          validate={validateInput}
          onSubmit={handleLogin}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* email input */}
              <TextField
                error={Boolean(errors.email)}
                fullWidth
                helperText={errors.email}
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              {/* password input */}
              <TextField
                error={ Boolean(errors.password) }
                fullWidth
                helperText={ errors.password }
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
              </Box>
              <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Do not have an account?
                  <Link
                    to="/register"
                    variant="h6"
                    style={{ padding: '10px' }}
                  >
                    Sign up
                  </Link>
                </Typography>
            </form>

          )}
        </Formik>
      </StyledLayout>

    </Container>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Login;
