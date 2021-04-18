import React from 'react';
import { useParams } from 'react-router-dom';
import Subtitle from '../components/Titles/Subtitle';
import Title from '../components/Titles/Title';
import JoinGameInput from '../components/JoinGameInput';
import makeAPIRequest from '../Api';

const GamePlayPlayerView = () => {
  const { sessionid: sessionId } = useParams();
  const [playerId, setPlayerId] = React.useState();
  const [question, setQuestion] = React.useState();
  const [start, setStart] = React.useState(false);

  // get session state
  React.useEffect(() => {
    // if the current browser has joined as a player
    if (localStorage.getItem('player')) {
      setPlayerId(JSON.parse(localStorage.getItem('player')).id);
    }
    // if player has been joined, fetch quiz question every 1 second
    if (playerId !== undefined) {
      const fetchQ = window.setInterval(() => {
        makeAPIRequest(`play/${playerId}/question`, 'GET', null, null, null)
          .then(res => {
            console.log(res)
            setQuestion(res.question)
            setStart(true);
          }).catch(() => {
            console.log('ERROR: Game  is not started or has been ended.');
            if (question !== undefined) {
              localStorage.removeItem('player');
              history.push(`/results/player/${playerId}`);
            }
            setStart(false);
          });
      }, 10000); // TODO: Change this to 1000 ms
      return () => clearInterval(fetchQ);
    }
  }, [])
  console.log('start: ', start)
  console.log('playerid: ', playerId)
  console.log('question: ', question)
  return (
    <>
      <Title>Welcome to BigBrain</Title>
      <Subtitle>Current Session: {sessionId}</Subtitle>
      {
        // if player Id is not set, ask user to join the game
        playerId === undefined
          ? <JoinGameInput sessionId={sessionId} setPlayerId={setPlayerId} />
          : (
              // if the session has not started (not fetched question), display user's nickname
              (start === false && question === undefined)
                ? <Subtitle>Nickname: {JSON.parse(localStorage.getItem('player')).nickname}</Subtitle>
                : (
                    // if start is false but question is not empty, the game is finished, display result
                    (start === false && question !== undefined)
                      ? <p>Quiz finished!</p>
                      : <p>Q: {JSON.stringify(question)}</p>
                  )
            )
      }
    </>
  );
};

export default GamePlayPlayerView;
