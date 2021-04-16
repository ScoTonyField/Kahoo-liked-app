import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ResultPlayerRow from '../TableRows/ResultPlayerRow';

const timeDiff = (before, after) => (after - before) / 1000;

const PlayerResultsTable = ({ results, questions }) => {
  const players = [];

  results.map(player => {
    const p = {};
    // player name
    p.name = player.name
    // calculage final score
    p.score = player.answers.reduce((a, b, indx) => {
      const pointsCurrentQuestion = b.correct ? +questions[indx].points : 0;
      return a + +pointsCurrentQuestion;
    }, 0)

    // calculate average time used to answer a question
    const avgTime = player.answers.reduce((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return timeDiff(aDate.questionStartedAt, aDate.answeredAt) - timeDiff(bDate.questionStartedAt, bDate.answeredAt);
    }, 0) / player.answers.length;
    p.averageTime = isNaN(avgTime) ? 0 : avgTime;

    players.push(p);
    return 1;
  })
  console.log(players)
  return (
    <>
      <h2>Players Overview</h2>
      <TableContainer component={Paper}>
        <Table aria-label="quiz history table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="right">Player Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Average Time to Answer</TableCell>
              <TableCell align="right"/>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              players.map((player, idx) => (
                <ResultPlayerRow key={idx} player={player} idx={idx} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

PlayerResultsTable.propTypes = {
  results: PropTypes.array,
  questions: PropTypes.array
};

export default PlayerResultsTable;
