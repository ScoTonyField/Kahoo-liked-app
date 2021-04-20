import React from 'react';
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
import { browserHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';
import PlayerResult from './pages/PlayerResult';

function App () {
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

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/dashboard" component={Dashboard} />

          {/* Session Result */}
          <Route exact path="/results/:sessionid" component={SessionResults} />
          <Route exact path="/results/player/:playerid" component={PlayerResult} />

          {/* Quiz edit */}
          <Route exact path='/quiz/edit/:quizid' component={GameEdit} />
          <Route exact path='/quiz/edit/:quizid/:questionid' component={QuestionEdit} />

          {/* Quiz play */}
          <Route exact path='/quiz/play/admin/:quizid/:sessionid' component={GameAdminController}/>
          <Route exact path='/quiz/play' component={JoinSession} />
          <Route exact path='/quiz/play/:sessionid' component={GamePlayerController} />

          {/* Home page */}
          <Route exact path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          {/* Any other path leads to 404 page */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
