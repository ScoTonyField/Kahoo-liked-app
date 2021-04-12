import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';

const PersonRow = ({ player }) => {
  return (
    <TableRow hover key={player.name}>
      <TableCell component="th" scope="row">{player.name}</TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  );
};

PersonRow.propTypes = {
  player: PropTypes.object
};

export default PersonRow;
