import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container, Card, CardMedia, Typography } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import makeAPIRequest from '../Api';
import Row from '../components/Row';
import IdGenerator from '../IdGenerator';
import styled from 'styled-components';
import QuizNameModal from '../components/Modals/QuizNameModal';

const HiddenInput = styled.input`
  display: none;
`;

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
  card: {
    maxWidth: '50%',
    margin: theme.spacing(2, 'auto', 0)
  },
  mediaButton: {
    margin: theme.spacing(3, 2, 2),
    width: '15%',
    height: '50px'
  },
  nameButton: {
    margin: theme.spacing(3, 4, 2),
    height: '30px'
  },
  nameText: {
    padding: theme.spacing(0, 2),
    textAlign: 'left'
  }
}));

const GameEdit = () => {
  const params = useParams();
  const [currentQuiz, setCurrentQuiz] = useState('');
  const [fetchData, setFetchData] = useState({});
  const [idList, setIdList] = useState([]);
  const [rows, setRows] = useState([]);
  const [defaultImage, setDefaultImage] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [defaultName, setDefaultName] = useState('');
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
      setDefaultName(data.name);
      setDefaultImage(data.thumbnail);
      // get current id list of the quiz
      const currentIdList = []
      for (let i = 0; i < data.questions.length; i++) {
        currentIdList.push(data.questions[i].qid);
      }
      setIdList(currentIdList);
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
          name: defaultName,
          thumbnail: defaultImage,
        }
      ),
    ).then(() => {
      // TODO: change the alert information
      alert('delete successfully');
    }).catch(e => {
      alert('Something wrong:' + e);
    })
  }

  const handleEdit = (qid, event) => {
    history.push(`/quiz/edit/${currentQuiz}/${qid}`);
  }

  const handleAdd = (event) => {
    const newQuestionId = IdGenerator(idList);
    history.push(`/quiz/edit/${currentQuiz}/${newQuestionId}`);
  }

  const handleNameChange = () => {
    if (!defaultName) {
      alert('Quiz name cannot be empty');
    } else {
      makeAPIRequest(
        `admin/quiz/${params.quizid}`,
        'PUT',
        localStorage.getItem('token'),
        null,
        JSON.stringify(
          {
            questions: rows,
            name: defaultName,
            thumbnail: defaultImage,
          }
        )
      ).then(() => {
        alert('name updates successfully');
      })
      setOpen(false);
    }
  }

  const handleSubmit = () => {
    if (imageChanged) {
      makeAPIRequest(
        `admin/quiz/${params.quizid}`,
        'PUT',
        localStorage.getItem('token'),
        null,
        JSON.stringify(
          {
            questions: rows,
            name: defaultName,
            thumbnail: defaultImage,
          }
        )
      ).then(() => {
        alert('Thumbnail updates successfully');
      })
    } else {
      alert('You did not change your thumbnail');
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
        <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="upload-media"
              height='180'
              image={defaultImage ?? 'https://tse4-mm.cn.bing.net/th/id/OIP.EEoake0D7LrG5c4X4TDPFQHaHa?pid=ImgDet&rs=1'}
            />
        </Card>
        <HiddenInput
          // disabled={defaultLink.length > 0}
          accept='image/*'
          id='avatar'
          type='file'
          onChange={(event) => {
            const file = event.target.files[0];
            const fileRead = new FileReader();
            fileRead.readAsDataURL(file);
            fileRead.onload = (data) => {
              setDefaultImage(data.target.result);
              setImageChanged(true);
            }
          }}
        />
        <label htmlFor="avatar">
          <Button
            variant='contained'
            color='primary'
            component='span'
            className={classes.mediaButton}
          >
            Change
          </Button>
        </label>
        <Button
          variant='contained'
          color='primary'
          component='span'
          className={classes.mediaButton}
          onClick={handleSubmit}
        >
          submit
        </Button>
        <Typography variant='h4' className={classes.nameText}>
          {`Editing ${nameChanged ? defaultName : fetchData.name}`}
          <Button
            variant='outlined'
            color='primary'
            className={classes.nameButton}
            onClick={(event) => setOpen(true)}
          >
            Change Quiz Name
          </Button>
          <QuizNameModal
            key={params.quizid}
            open={open}
            setOpen={setOpen}
            defaultName={defaultName}
            setDefaultName={setDefaultName}
            handleNameChange={handleNameChange}
            setNameChanged={setNameChanged}
          />
        </Typography>
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
                {rows.map((row, idx) => (
                  <Row key={idx} row={row} remove={handleDelete} edit={handleEdit}/>
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
