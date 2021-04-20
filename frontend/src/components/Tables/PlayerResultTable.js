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
import PlayerResultRow from '../TableRows/PlayerResultRow';

const PlayerResultTable = ({ playerAnswers, questions }) => {
  console.log('result table: ', playerAnswers, questions)
  return (
    <div>
      {
        // there's not point to display table if there's no player
        playerAnswers.length === 0 || questions.length === 0
          ? <p align='center'>Table not available: No question or no answer from this player</p>
          : (
              <TableContainer component={Paper}>
                <Table aria-label="player result table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell align="right">Questions</TableCell>
                      <TableCell align="right">Players Answer</TableCell>
                      <TableCell align="right">Correct Answer</TableCell>
                      <TableCell align="right">Response Time</TableCell>
                      <TableCell align="right">Correct</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      questions.map((q, idx) => (
                        <PlayerResultRow
                          key={idx}
                          playerAnswer={playerAnswers[idx]}
                          question={q}
                          idx={idx}
                        />
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )
      }
    </div>
  );
};

PlayerResultTable.propTypes = {
  playerAnswers: PropTypes.array,
  questions: PropTypes.array
};

export default PlayerResultTable;
