import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PlayerOverviewRow from '../TableRows/PlayerOverviewRow';
import { calculateIsoTimeDiff } from '../../TimeManipulation';

const PlayerOverviewTable = ({ results, questions }) => {
  const players = [];

  results.map(player => {
    const p = {};
    // player name and answers
    p.name = player.name
    p.answers = player.answers

    // calculage final score
    p.score = player.answers.reduce((a, b, indx) => {
      const pointsCurrentQuestion = b.correct ? +questions[indx].points : 0;
      return a + +pointsCurrentQuestion;
    }, 0)

    // calculate average time used to answer a question
    const avgTime = player.answers.reduce((a, b) =>
      a + calculateIsoTimeDiff(b.questionStartedAt, b.answeredAt), 0) / player.answers.length;

    p.averageTime = isNaN(avgTime) ? 0 : avgTime;
    players.push(p);
    return 1;
  })
  console.log(players)
  return (
    <>
      <h2>Players Overview</h2>
      {
        // there's not point to display table if there's no player
        players.length === 0
          ? <p align='center'>Table not available: No player</p>
          : (
              <TableContainer>
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
                        <PlayerOverviewRow key={idx} player={player} questions={questions} idx={idx} />
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )
      }
    </>
  );
};

PlayerOverviewTable.propTypes = {
  quiz: PropTypes.object,
  results: PropTypes.array,
  questions: PropTypes.array
};

export default PlayerOverviewTable;
