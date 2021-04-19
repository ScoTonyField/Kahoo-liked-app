import React from 'react';
import { useParams } from 'react-router-dom';
import Subtitle from '../components/Titles/Subtitle';
import Title from '../components/Titles/Title';
import GamePlayPlayerQuestion from './GamePlayerQuestion';
import JoinGame from './JoinGame';
import PlayerResult from './PlayerResult';

const GamePlayPlayerController = () => {
  const { sessionid: sessionId } = useParams();
  const [playerId, setPlayerId] = React.useState();
  // Progress: -1: lobby (not started), 0: in progress (started), 1: finish (ended)
  const [progress, setProgress] = React.useState();

  if (!localStorage.getItem('player')) {
    return <Subtitle>You did not join the quiz.</Subtitle>;
  }
  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    const playerInfo = JSON.parse(localStorage.getItem('player'));
    setPlayerId(playerInfo.id);
    setProgress(playerInfo.progress);
  }, [])
  console.log('progress: ', progress)
  console.log('playerid: ', playerId)

  const renderContent = () => {
    switch (progress) {
      // if progress < 0, the game is at lobby state and should ask user to join the game
      case -1:
        return <JoinGame setPlayerId={setPlayerId} setProgress={setProgress} />;

      // if progress == 0, the game is at question state
      case 0:
        return <GamePlayPlayerQuestion setProgress={setProgress} />;

      // if progress > 0, the game is finished. Display result page
      case 1:
        // (kat will do this): write a result page which contains a button that directs to player result page
        return <PlayerResult playerId={playerId} />;

      // should never reach
      default:
        return <p>ERROR: Invalid progress code</p>
    }
  }
  return (
    <>
      <Title>Welcome to BigBrain</Title>
      <Subtitle>Current Session: {sessionId}</Subtitle>
      { renderContent() }
    </>
  );
};

export default GamePlayPlayerController;
