import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';

import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
// import styles from './styles.css';
import Title from '../components/Titles/Title';
import makeAPIRequest from '../Api';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
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

const Login = () => {
  // const classes = useStyles();
  const history = useHistory();

  const handleLogin = (values, { setSubmitting }) => {
    const body = JSON.stringify({
      email: values.email,
      password: values.password,
    })
    makeAPIRequest('admin/auth/login', 'POST', null, null, body)
      .then(res => {
        localStorage.clear();
        localStorage.setItem('token', res.token);
        history.push('/dashboard');
      }).catch(err => {
        if (err.status === 400) {
          alert('Incorrect email or password, please try again.');
          setSubmitting(false);
        }
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledLayout>
        <Title>Sign in</Title>
        <Formik
          initialValues={{
            email: '',
            password: ''
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
              <Grid container justify='flex-end'>
                <Grid item>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Do not have an account?
                    <Link
                      to="/register"
                      variant="body1"
                      style={{ padding: '10px' }}>
                       Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </StyledLayout>

    </Container>
  );
};

Login.propTypes = {
  setPage: PropTypes.func
};

export default Login;
