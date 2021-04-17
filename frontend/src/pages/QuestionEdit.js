import { FormControl, Select, Typography, TextField, Divider, Button, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import styled from 'styled-components';
import makeAPIRequest from '../Api';
import SelectionBox from '../components/SelectionBox';
import VideoModal from '../components/Modals/VideoModal';
// import CardMedia from '@material-ui/core/CardMedia';
// import AnswerOptionModal from '../components/Modals/AnswerOptionModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    // height: '90vh'
  },
  sidebar: {
    padding: theme.spacing(2, 0),
    textAlign: 'left',
    minHeight: '100%'
  },
  main: {
    padding: theme.spacing(2, 3),
    minHeight: '100%',
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
    margin: theme.spacing(3, 2, 2),
    width: '25%',
    height: '50px'
  },
  mediaIcon: {
    margin: theme.spacing(8, 0, 2),
    fontSize: 'xx-large'
  },
}));

const HiddenInput = styled.input`
  display: none;
`;

const QuestionEdit = () => {
  const history = useHistory();

  const [questionsAll, setQuestionsAll] = useState({});
  const [open, setOpen] = useState(false);
  const [defaultLink, setDefaultLink] = useState('');
  const [questions, setQuestions] = useState({});
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultType, setDefaultType] = useState(true);
  const [defaultAnswer, setDefaultAnswer] = useState([]);
  const [defaultTime, setDefaultTime] = useState(5);
  const [defaultPoint, setDefaultPoint] = useState('');
  const [fetchData, setFetchData] = useState({});
  const params = useParams();
  const classes = useStyles();
  const checkOptions = () => {
    const optionList = [];
    for (let i = 1; i <= 6; i++) {
      if (document.getElementById('Q' + i).value) {
        optionList.push(document.getElementById('Q' + i).value);
      }
    }
    return optionList;
  }

  // TODO: add submit details
  const handleSubmit = () => {
    console.log(fetchData);

    if (params.questionid > questionsAll.length) {
      const updateQuestion = questionsAll;
      updateQuestion.push({
        qid: params.questionid,
        isSingle: defaultType,
        contents: defaultContent,
        timelimit: defaultTime,
        points: parseInt(defaultPoint),
        media: defaultLink, // youtube link
        options: checkOptions(),
        answers: defaultAnswer
      });
      console.log(updateQuestion);
      setQuestionsAll(updateQuestion);
      makeAPIRequest(
        `admin/quiz/${params.quizid}`,
        'PUT',
        localStorage.getItem('token'),
        null,
        JSON.stringify({
          questions: updateQuestion,
          name: fetchData.name,
          thumbnail: fetchData.thumbnail
        })
      ).then(() => {
        history.push(`/quiz/${params.quizid}`)
      })
    } else if (Object.keys(questionsAll).length === 0) {
      const updateQuestion = [];
      updateQuestion.push({
        qid: params.questionid,
        isSingle: defaultType,
        contents: defaultContent,
        timelimit: defaultTime,
        points: parseInt(defaultPoint),
        media: defaultLink, // youtube link
        options: checkOptions(),
        answers: defaultAnswer
      });
      console.log(updateQuestion);
      setQuestionsAll(updateQuestion);
      makeAPIRequest(
        `admin/quiz/${params.quizid}`,
        'PUT',
        localStorage.getItem('token'),
        null,
        JSON.stringify({
          questions: updateQuestion,
          name: fetchData.name,
          thumbnail: fetchData.thumbnail
        })
      ).then(() => {
        history.push(`/quiz/${params.quizid}`)
      })
    } else {
      const updateQuestion = fetchData.questions;
      // alert(updateQuestion);
      updateQuestion.splice(params.questionid - 1, 1, {
        qid: params.questionid,
        isSingle: defaultType,
        contents: defaultContent,
        timelimit: defaultTime,
        points: parseInt(defaultPoint),
        media: defaultLink, // youtube link
        options: checkOptions(),
        answers: defaultAnswer
      })
      console.log(updateQuestion);
      setQuestionsAll(updateQuestion);
      makeAPIRequest(
        `admin/quiz/${params.quizid}`,
        'PUT',
        localStorage.getItem('token'),
        null,
        JSON.stringify({
          questions: updateQuestion,
          name: fetchData.name,
          thumbnail: fetchData.thumbnail
        })
      ).then(() => {
        history.push(`/quiz/${params.quizid}`)
      })
    }
  }

  useEffect(() => {
    makeAPIRequest(
      `admin/quiz/${params.quizid}`,
      'GET',
      localStorage.getItem('token'),
      null,
      null
    ).then(data => {
      console.log(data);
      setFetchData(data);
      setQuestionsAll(data.questions)
      if (params.questionid <= data.questions.length) {
        setQuestions(data.questions[params.questionid - 1]);
        setDefaultContent(data.questions[params.questionid - 1].contents);
        setDefaultType(data.questions[params.questionid - 1].isSingle);
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
    return (
      <form>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={7} sm={8} md={8} lg={10}>
            <Paper className={classes.main} elevation={3}>
              {/* Type questions */}
              <Typography variant="h6">Current question ID: <b>{params.questionid}</b></Typography>
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
                minHeight='35%'
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
                  onClick={(event) => setOpen(true)}
                >
                  Youtube Link
                </Button>
                <VideoModal key={questions.qid} open={open} setOpen={setOpen} defaultLink={defaultLink} setDefaultLink={setDefaultLink}></VideoModal>
              </Box>
              <SelectionBox key={questions.qid} questions={questions} defaultType={defaultType} setDefaultType={setDefaultType} defaultAnswer={defaultAnswer} setDefaultAnswer={setDefaultAnswer}></SelectionBox>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={4} md={4} lg={2}>
            <Paper className={classes.sidebar} elevation={3}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Types (auto)
                </Typography>
                <Select
                  native
                  value={defaultType}
                  inputProps={{
                    name: 'types',
                    id: 'types',
                  }}
                >
                  <option aria-label="5" value={true}>Single-select</option>
                  <option value={false}>Multiple-select</option>
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
                  placeholder='Give your points'
                  value={defaultPoint}
                  onChange={(event) => setDefaultPoint(event.target.value)}
                >
                </TextField>
              </FormControl>
              <Divider className={classes.divider} />
              <Button
                // type='submit'
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    )
  }
};

export default QuestionEdit;
