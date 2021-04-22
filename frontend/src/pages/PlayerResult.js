import React from 'react';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';
import Subtitle from '../components/Titles/Subtitle';
import PlayerResultModal from '../components/Modals/PlayerResultModal';
import {
  Box,
} from '@material-ui/core';
import { calculateIsoTimeDiff } from '../TimeManipulation';
import { List } from 'react-content-loader';

const PlayerResult = ({ playerId }) => {
  // a list of result (1 per question)
  const [questions, setQuestions] = React.useState();
  const [player, setPlayer] = React.useState();
  React.useEffect(() => {
    makeAPIRequest(`play/${playerId}/results`, 'GET', null, null, null)
      .then(res => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        const answers = JSON.parse(localStorage.getItem('answers'));
        // construct player object
        const p = {};
        p.answers = res;
        p.score = p.answers.reduce((a, b, indx) => {
          const pointsCurrentQuestion = b.correct ? +questions[indx].points : 0;
          return a + +pointsCurrentQuestion;
        }, 0);
        const avgTime = p.answers.reduce((a, b) =>
          a + calculateIsoTimeDiff(b.questionStartedAt, b.answeredAt), 0) / p.answers.length;
        p.averageTime = isNaN(avgTime) ? 0 : avgTime;
        // construct questions array
        const q = JSON.parse(localStorage.getItem('questions'));
        // if (answers === null || answers === undefined) return Promise.reject(res);
        console.log(q);
        answers.map((a, idx) => {
          q[idx].answers = a.answerIds;
          return 1;
        });
        setQuestions(q)
        setPlayer(p);
      }).catch((err) => console.log('ERROR: error fetching player result. Please refresh page and try again.', err));
  }, [])

  // XXX: UX content loader
  if (player === undefined || questions === undefined) return <List />

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
        <Subtitle><b>Well done! View your result below.</b></Subtitle>
        <PlayerResultModal player={player} questions={questions} />
    </Box>
  );
};

PlayerResult.propTypes = {
  playerId: PropTypes.number
}

export default PlayerResult;
