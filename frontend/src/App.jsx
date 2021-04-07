import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import QuestionEdit from './pages/QuestionEdit';
// import GameEdit from './pages/GameEdit';
// import GamePlay from './pages/GamePlay';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import
{
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import makeAPIRequest from './Api';
import NotFound from './pages/NotFound';

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
}));

function App () {
  const classes = useStyles();
  // directs to different page by setting state
  const curRoute = window.location.href.split('/')[3];
  const [curPage, setCurPage] = React.useState(curRoute || 'home');
  // // auto update curPage when path
  // React.useEffect(() => {
  //   console.log(history)
  // }, [history[0]]);
  // console.log(window.location.href)

  // state to indicate if the user is logged in, is false by defualt
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')])
  console.log('cur page: ', curPage);
  console.log('token: ', token);

  const handleLogout = () => {
    makeAPIRequest('admin/auth/logout', 'POST', token, null, null)
      .then(() => {
        alert('Logged out successfully.')
        localStorage.clear();
        setToken('');
        setCurPage('home');
      }).catch(() => alert('Invalid Token'));
  }

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} component={ Link } to='/' color="inherit" onClick={() => setCurPage('home')}>
              BigBrain
            </Typography>
              {/* if not logged in, show login/register button */}
              {!token && (
                <div>
                  <Button component={ Link } color="inherit" to='/login' onClick={() => setCurPage('login')}>Login</Button>
                  <Button component={ Link } color="inherit" to='/register' onClick={() => setCurPage('register')}>Register</Button>
                </div>
              )}
              {/* if logged in, show dashboard and logout button */}
              {token && (
                <div>
                  <Button component={ Link } color="inherit" to='/dashboard' onClick={() => setCurPage('dashboard')}>Dashboard</Button>
                  <Button component={ Link } color="inherit" to='/home' onClick={handleLogout}>Logout</Button>
                </div>
              )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            exact path="/login"
            render={(props) => (
              <Login {...props} setPage={setCurPage} />
            )}/>
          <Route
            exact path="/register"
            render={(props) => (
              <Register {...props} setToken={setToken} setPage={setCurPage} />
            )}/>
          <Route
            exact path="/dashboard"
            render={(props) => (
              <Dashboard {...props} setPage={setCurPage}/>
            )}/>
          <Route
            exact path="/home"
            render={(props) => (
              <Home {...props} />
            )}/>

          {/* put root to bottom since switch would match route from top to bottm */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
