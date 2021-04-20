import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import { calculateIsoTimeDiff } from '../../TimeManipulation';

const PlayerResultRow = ({ playerAnswer, question, idx }) => {
  const wrapCorrectAnswer = (item, i) =>
    playerAnswer.answerIds.indexOf(i) > -1
      ? `${item} ✔`
      : item

  return (
    <TableRow hover key={idx}>
      <TableCell component="th" scope="row">{idx + 1}</TableCell>
      <TableCell align="left">{question.contents}</TableCell>
      <TableCell align="left">{question.points}</TableCell>
      <TableCell align="left">
        <ul>
          {
            // for each question, display all the options for that question
            // if the answer is player's answer, bold the text
            // NOTE: playerAnswer.answerIds are the indexes of what player selected for that question
            question.options.map((item, i) => (
              <li key={i}>
                {wrapCorrectAnswer(item, i)}
              </li>
            ))
          }
        </ul>
        {
          playerAnswer.answerIds.length === 0 &&
            <Typography variant="body2" color="error">
              The player did not <br/>answer this question
            </Typography>
        }
      </TableCell>
      <TableCell align="left">
        <ul>
          {
            question.answers.map((item, i) => (
              <li key={i}>{ question.options[item] }</li>
            ))
          }
        </ul>
      </TableCell>
      <TableCell align="left">
        {`${calculateIsoTimeDiff(playerAnswer.questionStartedAt, playerAnswer.answeredAt)}s`}
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1" color={playerAnswer.correct ? 'primary' : 'error'}>
          <b>{playerAnswer.correct ? 'Correct' : 'Wrong'}</b>
        </Typography>
      </TableCell>
    </TableRow>
  );
};

PlayerResultRow.propTypes = {
  playerAnswer: PropTypes.object,
  question: PropTypes.object,
  idx: PropTypes.number,
};

export default PlayerResultRow;
