import React from 'react';
import { useParams } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';

const PlayerResult = () => {
  const { playerid: playerId } = useParams();
  return (
    <>
      <Title>Player Results</Title>
      <Subtitle>Results for player {playerId}</Subtitle>
    </>
  );
};

export default PlayerResult;
