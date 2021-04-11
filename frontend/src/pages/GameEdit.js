import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Container } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import makeAPIRequest from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    margin: theme.spacing(2, 2),
  },
  addbtn: {
    margin: theme.spacing(2, 0),
  },
}));

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

// const rows = [
//   {
//     qid: '2346',
//     types: '1',
//     contents: 'What is your teachers name?',
//     timelimit: '10',
//     points: '10',
//     media: null,
//     options: [
//       'Tony',
//       'Hayden',
//       'Jerry',
//       'Scott'
//     ],
//     answers: [
//       '1',
//     ],
//   },
//   {
//     qid: '4336',
//     types: '2',
//     contents: 'What parts you enjoy in frontend?',
//     timelimit: '10',
//     points: '10',
//     media: null,
//     options: [
//       'coding',
//       'design',
//       'testin',
//       'communicate with people'
//     ],
//     answers: [
//       '0',
//       '1',
//       '2',
//       '3'
//     ],
//   },
// ];

const GameEdit = (props) => {
  const params = useParams();
  const [currentQuiz, setCurrentQuiz] = useState('');
  const [fetchData, setFetchData] = useState({});
  const [rows, setRows] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setCurrentQuiz(params.quizid);
    // console.log(currentQuiz);
    makeAPIRequest(
      // 'admin/quiz/151478828',
      `admin/quiz/${currentQuiz}`,
      'GET',
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhheWRlbkB1bnN3LmVkdS5hdSIsImlhdCI6MTYwMzk0MzIzMH0.b37PfwlcH_cue6yhgvDt2IiNvhRACf79hTNtacYB94Q',
      props.token,
      null,
      null
    ).then(data => {
      setFetchData(data);
      setRows(data.questions);
    });
    console.log(fetchData);
  }, []);
  const classes = useStyles();
  const handleDelete = (qid, event) => {
    const newRows = rows.filter((item) => item.qid !== qid);
    setRows(newRows);
    makeAPIRequest(
      `admin/quiz/${currentQuiz}`,
      'DELETE',
      props.token,
      null,
      null
    )
  }

  const handleEdit = (qid, event) => {
    history.push(`/quiz/${currentQuiz}/${qid}`);
  }

  const handleAdd = (event) => {
    const newQuizId = ++rows.length
    history.push(`/quiz/${currentQuiz}/${newQuizId}`);
  }

  if (rows.length === 0) {
    return (
      <Container maxWidth='md' component='main' className={classes.root}>
        <Paper className={classes.paper} variant='outlined'>
          <Typography variant='h5'>No questions in this game now, please add your question.</Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddBoxRoundedIcon />}
            className={classes.addbtn}
          >
            Add
          </Button>
        </Paper>
      </Container>
    )
  } else {
    return (
      <Container maxWidth='md' component='main' className={classes.root}>
        <Typography variant='h4'>{fetchData.name}</Typography>
        <Paper className={classes.paper} variant='outlined'>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Question ID</TableCell>
                  <TableCell align="center">Question Type</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.qid} row={row} remove={handleDelete} edit={handleEdit}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddBoxRoundedIcon />}
          className={classes.addbtn}
          onClick={(event) => { handleAdd(event) }}
        >
          Add
        </Button>
      </Container>
    );
  }
};

GameEdit.propTypes = {
  token: PropTypes.any.isRequired,
};

export default GameEdit;
