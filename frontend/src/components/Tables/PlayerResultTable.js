import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PlayerResultRow from '../TableRows/PlayerResultRow';
import Subtitle from '../Titles/Subtitle';

const PlayerResultTable = ({ playerAnswers, questions, score, avgTime }) => {
  return (
    <div>
      <Typography variant='h6'>
        Final Score: {score} <br/>
        Average Answer Time: {avgTime}
      </Typography>
      <Subtitle>Questions Break Down</Subtitle>
      {
        // there's not point to display table if there's no player
        playerAnswers.length === 0 || questions.length === 0
          ? <p align='center'>Table not available: No question or no answer from this player</p>
          : (
              <TableContainer>
                <Table aria-label="player result table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question No.</TableCell>
                      <TableCell align="left">Question</TableCell>
                      <TableCell align="left">Points</TableCell>
                      <TableCell align="left">Players Answer <br/>(the one with ✔)</TableCell>
                      <TableCell align="left">Correct Answer</TableCell>
                      <TableCell align="left">Response Time</TableCell>
                      <TableCell align="left">Result</TableCell>
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
  questions: PropTypes.array,
  score: PropTypes.number,
  avgTime: PropTypes.number,
};

export default PlayerResultTable;
