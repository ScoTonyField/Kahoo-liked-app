import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

const ResultPlayerRow = ({ player }) => {
  return (
    <TableRow hover key={player.name}>
      <TableCell component="th" scope="row">{player.name}</TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  );
};

ResultPlayerRow.propTypes = {
  player: PropTypes.object
};

export default ResultPlayerRow;
