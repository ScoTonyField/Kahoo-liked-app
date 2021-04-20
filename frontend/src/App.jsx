import React from 'react';

// pages
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestionEdit from './pages/QuestionEdit';
import GameEdit from './pages/GameEdit';
import SessionResults from './pages/SessionResults';
import NotFound from './pages/NotFound';
import JoinSession from './pages/JoinSession';
import GamePlayerController from './pages/GamePlayerController';
import GameAdminController from './pages/GameAdminController';

// components
import AppHeader from './components/AppHeader';

// packages
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PlayerResult from './pages/PlayerResult';

// style sheets
import './App.css';

function App () {
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
    console.log('token: ', token);
  }, [localStorage.getItem('token')])

  const logout = () => setToken('');

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path='/quiz/play'
            render={({ match: { url } }) => (
              <>
                <Switch>
                  {/* Quiz play */}
                  <Route exact path={`${url}/admin/:quizid/:sessionid`} component={GameAdminController}/>
                  <Route exact path={url} component={JoinSession} />
                  <Route exact path={`${url}/:sessionid`} component={GamePlayerController} />

                  {/* Any other path leads to 404 page */}
                  <Route path="*" component={NotFound} />
                </Switch>
              </>
            )}
          />
          <Route
            path='/'
            render={({ match: { url } }) => (
              <>
                <AppHeader token={token} logout={logout}/>
                {/* Home page */}
                <Switch>
                  <Route exact path={url} component={Home}/>
                  <Route exact path={`${url}home`} component={Home}/>
                  <Route exact path={`${url}login`} component={Login}/>
                  <Route exact path={`${url}register`} component={Register}/>
                  <Route exact path={`${url}dashboard`} component={Dashboard} />

                  {/* Session Result */}
                  <Route exact path={`${url}results/:sessionid`} component={SessionResults} />
                  <Route exact path={`${url}results/player/:playerid`} component={PlayerResult} />

                  {/* Quiz edit */}
                  <Route exact path={`${url}quiz/edit/:quizid`} component={GameEdit} />
                  <Route exact path={`${url}quiz/edit/:quizid/:questionid`} component={QuestionEdit} />

                  <Route exact path="*" component={NotFound} />

                </Switch>
              </>
            )}
          />
          {/* Any other path leads to 404 page */}
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
