import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@material-ui/core';

const ResultPlayerRow = ({ player, idx }) => {
  return (
    <TableRow hover key={idx}>
      <TableCell component="th" scope="row">{idx + 1}</TableCell>
      <TableCell align="right">{player.name}</TableCell>
      <TableCell align="right">{player.score}</TableCell>
      <TableCell align="right">{player.averageTime ?? '[Not Available]'}</TableCell>
      <TableCell align="right">
        <Button size="small" variant="outlined">View Stats</Button>
      </TableCell>
    </TableRow>
  );
};

ResultPlayerRow.propTypes = {
  player: PropTypes.object,
  idx: PropTypes.number,
};

export default ResultPlayerRow;
