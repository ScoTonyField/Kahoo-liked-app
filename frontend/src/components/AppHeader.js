import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    zIndex: theme.zIndex.title + 1,
  }
}));

const AppHeader = ({ token, logout }) => {
  const classes = useStyles();
  // Handle logout button, clear localstorage and reset current page
  const handleLogout = () => {
    makeAPIRequest('admin/auth/logout', 'POST', localStorage.getItem('token'), null, null)
      .then(() => {
        alert('Logged out successfully.')
        localStorage.clear();
        logout();
      }).catch(() => alert('Invalid Token'));
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} component={ Link } to='/' color="inherit">
          BigBrain
        </Typography>
          {
            token
              /* if not logged in, show login/register button */
              ? (
                  <div>
                    <Button component={ Link } color="inherit" to='/login'>Login</Button>
                    <Button component={ Link } color="inherit" to='/register'>Register</Button>
                  </div>
                )
              /* if logged in, show dashboard and logout button */
              : (
                  <div>
                    <Button component={ Link } color="inherit" to='/dashboard'>Dashboard</Button>
                    <Button component={ Link } color="inherit" to='/home' onClick={handleLogout}>Logout</Button>
                  </div>
                )
          }
      </Toolbar>
    </AppBar>
  )
};

AppHeader.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func,
};

export default AppHeader;
