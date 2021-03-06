import React from 'react';
import { useParams } from 'react-router-dom';
import Subtitle from '../components/Titles/Subtitle';
import Title from '../components/Titles/Title';
import GamePlayerQuestion from './GamePlayerQuestion';
import LobbyPlayer from './LobbyPlayer';
import PlayerResult from './PlayerResult';

const GamePlayPlayerController = () => {
  const { sessionid: sessionId } = useParams();
  const [playerId, setPlayerId] = React.useState();
  // Progress: -1: lobby (not started), 0: in progress (started), 1: finish (ended)
  const [progress, setProgress] = React.useState();

  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    if (!localStorage.getItem('player') || sessionId !== JSON.parse(localStorage.getItem('player')).sessionid) {
      localStorage.clear();
      setProgress(-1);
      // return <Subtitle>You did not join the quiz.</Subtitle>;
    } else {
      const playerInfo = JSON.parse(localStorage.getItem('player'));
      setPlayerId(playerInfo.id);
      setProgress(playerInfo.progress);
      if (localStorage.getItem('answers')) {
        setProgress(1);
      }
    }
  }, [])
  console.log('progress: ', progress)
  console.log('playerid: ', playerId)

  const renderContent = () => {
    console.log(progress)
    switch (progress) {
      // if progress < 0, the game is at lobby state and should ask user to join the game
      case -1:
        return <LobbyPlayer setPlayerId={setPlayerId} setProgress={setProgress} />;

      // if progress == 0, the game is at question state
      case 0:
        return <GamePlayerQuestion setProgress={setProgress} />;

      // if progress > 0, the game is finished. Display result page
      case 1:
        //  result page which contains a button that directs to player result page
        return <PlayerResult playerId={playerId} />;

      // should never reach
      default:
        return <p>ERROR: Invalid progress code {'' + progress}</p>
    }
  }
  return (
    <>
      <Title color='#303F9F'>Welcome to BigBrain</Title>
      <Subtitle color='#303F9F'>Current Session: {sessionId}</Subtitle>
      { renderContent() }
    </>
  );
};

export default GamePlayPlayerController;
