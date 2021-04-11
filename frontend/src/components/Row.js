import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';

function Row (props) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {props.row.qid}
        </TableCell>
        <TableCell align="center">{props.row.types}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="primary" onClick={ (event) => { props.edit(props.row.qid, event) }}>
            Edit
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button variant='contained' color='secondary' onClick={(event) => { props.remove(props.row.qid, event) }}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant='h5' component='div'>
                {props.row.contents}
              </Typography>
              {props.row.options.map((data) => (
                <Typography variant='body1' component='div' key={data}>
                  {data}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    qid: PropTypes.string.isRequired,
    types: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    timelimit: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
    media: PropTypes.any,
    options: PropTypes.array.isRequired,
    answers: PropTypes.array.isRequired,
  }).isRequired,
  remove: PropTypes.func,
  edit: PropTypes.func,
};

export default Row;
