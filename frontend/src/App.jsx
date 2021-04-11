import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestionEdit from './pages/QuestionEdit';
import GameEdit from './pages/GameEdit';
import Results from './pages/Results';
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

  React.useEffect(() => {
    setCurPage(curRoute || 'home');
    console.log('cur page: ', curPage);
  }, [curRoute]);

  // FIXME: state to indicate if the user is logged in, is false by defualt
  // keep it for any legacy issue. Will be removed later
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
    console.log('token: ', token);
  }, [localStorage.getItem('token')])

  // Handle logout button, clear localstorage and reset current page
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
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/results/:sessionid" component={Results} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Route
            exact path='/quiz/:quizid' component={GameEdit} />
          <Route
            eact path='/quiz/:quizid/:questionid' component={QuestionEdit} />
          {/* Any other path leads to 404 page */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
