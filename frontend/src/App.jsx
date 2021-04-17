import React from 'react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestionEdit from './pages/QuestionEdit';
import GameEdit from './pages/GameEdit';
import Results from './pages/Results';
// import GamePlay from './pages/GamePlay';
import { browserHistory } from 'react-router';

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
  appbar: {
    zIndex: theme.zIndex.title + 1,
  }
}));

function App () {
  const classes = useStyles();
  // const loc = browserHistory.getCurrentLocation();

  // directs to different page by setting state
  const [curPage, setCurPage] = React.useState();

  // update curPage automatically
  React.useEffect(() => {
    const loc = browserHistory.getCurrentLocation();
    setCurPage(loc.pathname);
  }, [])
  browserHistory.listen(location => {
    console.log(location.pathname)
  })
  console.log('cur page: ', curPage);
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
                  <Button component={ Link } color="inherit" to='/login'>Login</Button>
                  <Button component={ Link } color="inherit" to='/register'>Register</Button>
                </div>
              )}
              {/* if logged in, show dashboard and logout button */}
              {token && (
                <div>
                  <Button component={ Link } color="inherit" to='/dashboard'>Dashboard</Button>
                  <Button component={ Link } color="inherit" to='/home' onClick={handleLogout}>Logout</Button>
                </div>
              )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/quiz/:quizid" component={GameEdit} />
          <Route exact path="/quiz/:quizid/:questionid" component={QuestionEdit} />
          <Route exact path="/results/:sessionid" component={Results} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Route exact path='/quiz/:quizid' component={GameEdit} />
          <Route exact path='/quiz/:quizid/:questionid' component={QuestionEdit} />
          {/* Any other path leads to 404 page */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
