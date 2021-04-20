import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { calculateIsoTimeDiff } from '../../TimeManipulation';

const PlayerResultRow = ({ playerAnswer, question, idx }) => {
  const wrapCorrectAnswer = (item, i) =>
    playerAnswer.answerIds.indexOf(i) > -1
      ? `${item} ✔`
      : item
  console.log('qqq', playerAnswer)
  return (
    <TableRow hover key={idx}>
      <TableCell component="th" scope="row">{idx + 1}</TableCell>
      <TableCell align="right">{question.contents}</TableCell>
      <TableCell align="right">
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
      </TableCell>
      <TableCell align="right">
        <ul>
          {
            question.answers.map((item, i) => (
              <li key={i}>{ question.options[item] }</li>
            ))
          }
        </ul>
      </TableCell>
      <TableCell align="right">
        {calculateIsoTimeDiff(playerAnswer.questionStartedAt, playerAnswer.answeredAt)}
      </TableCell>
      <TableCell align="right">{'' + playerAnswer.correct}</TableCell>
    </TableRow>
  );
};

PlayerResultRow.propTypes = {
  playerAnswer: PropTypes.object,
  question: PropTypes.object,
  idx: PropTypes.number,
};

export default PlayerResultRow;
