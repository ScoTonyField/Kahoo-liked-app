import { Button, Container, FormControl, FormHelperText, Grid, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ setLogin, setPage }) => {
  console.log(setLogin);

  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
    setPage('dashboard');
    // window.location.replace('/dashboard');
    window.location = '/dashboard';
  }

  return (
    <Container>
      Login
      <form onSubmit={handleLogin}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input type='email' id="email" aria-describedby="my-helper-text" />
                <FormHelperText id="email-label">We will never share your email.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="password">password</InputLabel>
                <Input type='password' id="password" aria-describedby="my-helper-text" />
                <FormHelperText id="password-label">We will never share your email.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Button type='submit' variant="contained" color="primary">
              Login
            </Button>
            </Grid>
          </Grid>
      </form>
    </Container>
  );
};

Login.propTypes = {
  setLogin: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

export default Login;
