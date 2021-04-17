import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Container } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import makeAPIRequest from '../Api';
import Row from '../components/Row';
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

const GameEdit = () => {
  const params = useParams();
  const [currentQuiz, setCurrentQuiz] = useState('');
  const [fetchData, setFetchData] = useState({});
  const [rows, setRows] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const newCurrentQuiz = params.quizid;
    setCurrentQuiz(newCurrentQuiz);
    makeAPIRequest(
      `admin/quiz/${params.quizid}`,
      'GET',
      localStorage.getItem('token'),
      null,
      null
    ).then(data => {
      setFetchData(data);
      setRows(data.questions);
    });
  }, []);
  const classes = useStyles();
  const handleDelete = (qid, event) => {
    const newRows = rows.filter((item) => item.qid !== qid);
    setRows(newRows);
    makeAPIRequest(
      `admin/quiz/${params.quizid}`,
      'PUT',
      localStorage.getItem('token'),
      null,
      JSON.stringify(
        {
          questions: newRows,
          name: fetchData.name,
          thumbnail: fetchData.thumbnail
        }
      ),
    ).then(() => {
      alert('delete successfully');
    }).catch(e => {
      alert('Something wrong:' + e);
    })
  }

  const handleEdit = (qid, event) => {
    history.push(`/quiz/${currentQuiz}/${qid}`);
  }

  const handleAdd = (event) => {
    if (Object.keys(rows).length === 0) {
      history.push(`/quiz/${currentQuiz}/1`);
    } else {
      const newQuizId = ++rows.length
      history.push(`/quiz/${currentQuiz}/${newQuizId}`);
    }
  }

  if (Object.keys(rows).length === 0 || rows.length === 0) {
    return (
      <Container maxWidth='md' component='main' className={classes.root}>
        <Paper className={classes.paper} variant='outlined'>
          <Typography variant='h5'>No questions in this game now, please add your question.</Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddBoxRoundedIcon />}
            className={classes.addbtn}
            onClick={(event) => { handleAdd(event) }}
          >
            Add
          </Button>
        </Paper>
      </Container>
    )
  } else {
    console.log(rows);
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

export default GameEdit;
