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
  Link
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
  const [curPage, setCurPage] = React.useState('home');
  // state to indicate if the user is logged in, is false by defualt
  const [token, setToken] = React.useState('');
  console.log(curPage, setToken);
  console.log(token)
  const handleLogout = () => {
    setToken('');
    setCurPage('home');
  }

  React.useEffect(() => {
    return setToken('');
  }, [])
  return (
    <div>
    <Router>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} component={ Link } to='/' color="inherit" onClick={() => setCurPage('home')}>
            BigBrane
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
        <Route path="/login"><Login setToken={setToken} setPage={setCurPage} /></Route>
        <Route path="/register" component={Register}/>
        <Route path="/dashboard" component={Dashboard}/>
        {/* put root to bottom since switch would match route from top to bottm */}
        <Route path="/"><Home token={token} /></Route>
      </Switch>
    </Router>
    </div>

  );
}

export default App;
