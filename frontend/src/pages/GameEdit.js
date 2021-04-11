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
import Paper from '@material-ui/core/Paper';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Container } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import makeAPIRequest from '../Api';
import Row from '../components/Row';
import Title from '../components/Titles/Title';
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
    const newQuizId = ++rows.length;
    history.push(`/quiz/${currentQuiz}/${newQuizId}`);
  }
  // TODO: test part, delete these in the future
  const handleTest = () => {
    makeAPIRequest(
      `admin/quiz/${currentQuiz}`,
      'PUT',
      localStorage.getItem('token'),
      null,
      JSON.stringify(
        {
          questions: [
            {
              qid: '2346',
              isSingle: true,
              contents: 'What is your teachers name?',
              timeLimit: 10,
              points: 10,
              media: null,
              options: [
                'Tony',
                'Hayden',
                'Jerry',
                'Scott'
              ],
              answers: [
                1,
              ],
            },
            {
              qid: '4336',
              isSingle: false,
              contents: 'What parts you enjoy in frontend?',
              timeLimit: 10,
              points: 10,
              media: null,
              options: [
                'coding',
                'design',
                'testin',
                'communicate with people'
              ],
              answers: [
                0,
                1,
                2
              ],
            },
          ],
          name: 'My first quiz',
          thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
        }
      )
    ).then(() => {
      console.log('update successfully');
    })
  }

  const questionTable = () => {
    return (
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
    )
  }

  return (
    <Container maxWidth='md' component='main' className={classes.root}>
      <Title>{fetchData.name}</Title>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddBoxRoundedIcon />}
        className={classes.addbtn}
        onClick={(event) => { handleAdd(event) }}
      >
        Add
      </Button>
      <Paper className={classes.paper} variant='outlined'>
      {
        rows.length > 0
          ? questionTable()
          : (
              <>
                <Button variant='contained' color="primary" onClick={handleTest}>Test</Button>
                <p>No questions</p>
              </>
            )
      }
      </Paper>
    </Container>
  );
};

export default GameEdit;
