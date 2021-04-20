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
import GameHistoryItem from '../TableRows/GameHistoryItem';

const GameHistoryTable = ({ history }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="quiz history table">
        <TableHead>
          <TableRow>
            <TableCell>Session id</TableCell>
            <TableCell align="right">Answer Available</TableCell>
            <TableCell align="right">Last Question Started Time</TableCell>
            <TableCell align="right">Number of Questions</TableCell>
            <TableCell align="right">Number of Players</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            history.map(sessionId => (
              <GameHistoryItem key={sessionId} sessionId={sessionId} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
};

GameHistoryTable.propTypes = {
  history: PropTypes.array,
};

export default GameHistoryTable;
