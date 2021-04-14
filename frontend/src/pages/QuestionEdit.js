import { FormControl, Select, Typography, TextField, Divider, Button, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import styled from 'styled-components';
import makeAPIRequest from '../Api';
import SelectionBoxModal from '../components/Modals/SelectionBoxModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    height: '90vh'
  },
  sidebar: {
    padding: theme.spacing(2, 0),
    textAlign: 'left',
    height: '100%'
  },
  main: {
    padding: theme.spacing(2, 3),
    height: '100%',
    // textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1, 3),
    width: '80%',
  },
  text: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(2, 3),
    width: '80%',
    height: '50px',
  },
  content: {
    margin: theme.spacing(2, 0),
  },
  media: {
    margin: theme.spacing(2, 'auto', 0),
    color: 'grey',
    textAlign: 'center'
  },
  mediaButton: {
    margin: theme.spacing(5, 2, 0),
    width: '40%',
    height: '50px'
  },
  mediaIcon: {
    margin: theme.spacing(10, 0, 2),
    fontSize: 'xx-large'
  },
  answerBox: {
    margin: theme.spacing(2, 2, 0)
  },
  questionForm: {
    margin: theme.spacing(2, 3),
  },
  checkbox: {
    margin: theme.spacing(3, 2),
  }
}));

const HiddenInput = styled.input`
  display: none;
`;

const QuestionEdit = () => {
  const [questions, setQuestions] = useState({});
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultType, setDefaultType] = useState('1');
  const [defaultTime, setDefaultTime] = useState(5);
  const [defaultPoint, setDefaultPoint] = useState(0);
  const [fetchData, setFetchData] = useState({});
  const params = useParams();
  const classes = useStyles();
  // TODO: add submit details
  const handleSubmit = () => {
    alert(document.getElementById('Q1').value);
    console.log(fetchData);
    // TODO: implement submit function
    // if (params.questionid <= data.questions.length) {
    //   setQuestions([])
    // }
    // makeAPIRequest(
    //   `admin/quiz/${params.quizid}/${params.questionid}`,
    //   'PUT',
    //   localStorage.getItem('token'),
    //   null,
    //   null,
    // )
  }

  useEffect(() => {
    console.log(params);
    makeAPIRequest(
      `admin/quiz/${params.quizid}`,
      'GET',
      localStorage.getItem('token'),
      null,
      null
    ).then(data => {
      console.log(data);
      setFetchData(data);
      if (params.questionid <= data.questions.length) {
        setQuestions(data.questions[params.questionid - 1]);
        console.log(data.questions[params.questionid - 1]);
        setDefaultContent(data.questions[params.questionid - 1].contents);
        setDefaultType(data.questions[params.questionid - 1].types);
        setDefaultTime(data.questions[params.questionid - 1].timelimit);
        setDefaultPoint(data.questions[params.questionid - 1].points);
      }
    });
  }, [])

  if (!questions || questions.length === 0) {
    return (
      <p>Data is Loding..</p>
    )
  } else {
    // TODO: add reset button
    return (
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={10}>
            <Paper className={classes.main} elevation={3}>
              {/* Type questions */}
              <Typography variant="h6">Current question ID: <b>{questions.qid}</b></Typography>
              <TextField
                variant='outlined'
                id='content'
                name='content'
                placeholder='Start typing your question'
                fullWidth
                className={classes.content}
                value={defaultContent}
                onChange={(event) => setDefaultContent(event.target.value)}
              >
              </TextField>
              <Box
                border={1}
                borderColor='lightgrey'
                borderRadius='borderRadius'
                minHeight='40%'
                minWidth='45%'
                className={classes.media}
              >
                <WallpaperIcon color='disabled' className={classes.mediaIcon}/>
                <Typography variant='body1'>
                  Click following button to upload your attached media
                </Typography>
                <HiddenInput
                  accept='image/*'
                  id='image-upload-btn'
                  type='file'
                />
                <label htmlFor="image-upload-btn">
                  <Button
                    variant='contained'
                    color='primary'
                    component='span'
                    className={classes.mediaButton}
                  >
                    Image
                  </Button>
                </label>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.mediaButton}
                >
                  Youtube Link
                </Button>
              </Box>
              <SelectionBoxModal key={questions.qid} questions={questions}></SelectionBoxModal>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.sidebar} elevation={3}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Answer options
                </Typography>
                <Select
                  native
                  value={defaultType}
                  onChange={(event) => setDefaultType(event.target.value)}
                  inputProps={{
                    name: 'questionTypes',
                    id: 'question-type',
                  }}
                >
                  <option aria-label="single-select" value={'1'}>Single select</option>
                  <option value={'2'}>Multi-select</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Time limit
                </Typography>
                <Select
                  native
                  value={defaultTime}
                  onChange={(event) => setDefaultTime(event.target.value)}
                  inputProps={{
                    name: 'timelimit',
                    id: 'time-limit',
                  }}
                >
                  <option aria-label="5" value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={15}>15s</option>
                  <option value={20}>20s</option>
                  <option value={25}>25s</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Points
                </Typography>
                <TextField
                  variant='outlined'
                  // required
                  id='points'
                  name='points'
                  value={defaultPoint}
                  onChange={(event) => setDefaultPoint(event.target.value)}
                >
                </TextField>
              </FormControl>
              <Divider className={classes.divider} />
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.button}
              >
                Submit
              </Button>
              {/* <Button
                variant='contained'
                color='default'
                className={classes.button}
              >
                Reset
              </Button> */}
            </Paper>
          </Grid>
        </Grid>
      </form>
    )
  }
};

export default QuestionEdit;
