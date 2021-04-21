import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import PlayerResultModal from '../Modals/PlayerResultModal';

const PlayerOverviewRow = ({ player, questions, idx }) => {
  return (
    <TableRow hover key={idx}>
      <TableCell component="th" scope="row">{idx + 1}</TableCell>
      <TableCell align="right">{player.name}</TableCell>
      <TableCell align="right">{player.score}</TableCell>
      <TableCell align="right">{player.averageTime ?? '[Not Available]'}</TableCell>
      <TableCell align="right">
        <PlayerResultModal player={player} questions={questions}/>
      </TableCell>
    </TableRow>
  );
};

PlayerOverviewRow.propTypes = {
  player: PropTypes.object,
  questions: PropTypes.array,
  idx: PropTypes.number,
};

export default PlayerOverviewRow;
