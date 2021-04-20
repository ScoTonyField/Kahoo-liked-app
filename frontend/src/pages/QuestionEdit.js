import { FormControl, Select, Typography, TextField, Divider, Button, Box, Card, CardActionArea, CardMedia } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import makeAPIRequest from '../Api';
import SelectionBox from '../components/SelectionBox';
import VideoModal from '../components/Modals/VideoModal';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
  },
  sidebar: {
    padding: theme.spacing(2, 0),
    textAlign: 'left',
    minHeight: '100%'
  },
  main: {
    padding: theme.spacing(2, 3),
    minHeight: '100%',
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
  card: {
    maxWidth: '50%',
    margin: theme.spacing(2, 'auto', 0)
  },
  // popover: {
  //   padding: theme.spacing(2),
  //   // backgroundColor: 'lightgrey'
  // }
}));

const HiddenInput = styled.input`
  display: none;
`;

const QuestionEdit = () => {
  const history = useHistory();

  const [questionsAll, setQuestionsAll] = useState([]);
  const [open, setOpen] = useState(false);
  const [defaultLink, setDefaultLink] = useState('');
  const [questions, setQuestions] = useState({});
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultType, setDefaultType] = useState(true);
  const [defaultAnswer, setDefaultAnswer] = useState([]);
  const [defaultTime, setDefaultTime] = useState(5);
  const [defaultPoint, setDefaultPoint] = useState('');
  const [fetchData, setFetchData] = useState({});
  const [defaultOptions, setDefaultOptions] = useState([]);
  // const [defaultImage, setDefaultImage] = useState();
  // const [urlAvailable, setUrlAvailable] = useState(false);
  const [defaultMedia, setDefaultMedia] = useState('img');
  // const [anchorEl, setAnchorEl] = useState(null);
  // const imgaePop = Boolean(anchorEl);
  // const imagePopId = imgaePop ? 'image-popover' : undefined;

  const params = useParams();
  const classes = useStyles();

  const locateQuestion = (questionsAll, id) => {
    for (let i = 0; i < questionsAll.length; i++) {
      if (id === questionsAll[i].qid) {
        return i;
      }
    }
    return -1;
  }

  const isOptionsValid = (defaultOptions) => {
    if (defaultOptions.length < 2) {
      return false;
    } else {
      for (let i = 0; i < defaultOptions.length; i++) {
        const reduceList = defaultOptions.filter(item => item !== defaultOptions[i])
        if (reduceList.length !== defaultOptions.length - 1) {
          return false;
        }
      }
    }
    return true;
  }

  const deleteEmptyOption = () => {
    const OptionsAll = defaultOptions;
    while (OptionsAll.indexOf('') !== -1) {
      OptionsAll.splice(OptionsAll.indexOf(''), 1);
    }
    setDefaultOptions(OptionsAll);
  }

  const handleSubmit = () => {
    console.log(fetchData);
    deleteEmptyOption();
    if (!defaultContent) {
      alert('Question content cannot be empty')
    } else if (!isOptionsValid(defaultOptions)) {
      alert('Answer options cannot less than 2 or be repeat options')
    } else if (!defaultPoint || defaultPoint < 0) {
      alert('Question point cannot be empty or negative');
    } else if (defaultAnswer.length === 0) {
      alert('You need to select at least one correct answer');
    } else {
      if (!questionsAll.length || locateQuestion(questionsAll, params.questionid) === -1) {
        const updateQuestion = questionsAll;
        updateQuestion.push({
          qid: params.questionid,
          isSingle: defaultType,
          contents: defaultContent,
          timeLimit: parseInt(defaultTime),
          points: parseInt(defaultPoint),
          media: defaultLink,
          options: defaultOptions,
          answers: defaultAnswer
        });
        console.log(updateQuestion);
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
          history.push(`/quiz/edit/${params.quizid}`)
        })
      } else {
        const idx = locateQuestion(questionsAll, params.questionid);
        const updateQuestion = questionsAll;
        updateQuestion.splice(idx, 1, {
          qid: params.questionid,
          isSingle: defaultType,
          contents: defaultContent,
          timeLimit: parseInt(defaultTime),
          points: parseInt(defaultPoint),
          media: defaultLink,
          options: defaultOptions,
          answers: defaultAnswer
        })
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
          history.push(`/quiz/edit/${params.quizid}`)
        })
      }
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
      const questionIndex = locateQuestion(data.questions, params.questionid);
      if (questionIndex !== -1) {
        setQuestions(data.questions[questionIndex]);
        setDefaultContent(data.questions[questionIndex].contents);
        setDefaultType(data.questions[questionIndex].isSingle);
        setDefaultTime(parseInt(data.questions[questionIndex].timeLimit));
        setDefaultPoint(parseInt(data.questions[questionIndex].points));
        if (data.questions[questionIndex].media.length > 0 && data.questions[questionIndex].media.split('/')[0] === 'data:image') {
          setDefaultMedia('img')
          setDefaultLink(data.questions[questionIndex].media);
        } else {
          setDefaultMedia('iframe');
          setDefaultLink(data.questions[questionIndex].media);
        }
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
              <Typography variant="h6">Current question ID: <b>{params.questionid}</b></Typography>
              <TextField
                variant='outlined'
                error={!defaultContent}
                id='content'
                name='content'
                placeholder='Start typing your question'
                fullWidth
                className={classes.content}
                value={defaultContent}
                helperText={defaultContent ? '' : 'Empty input is invalid'}
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
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component={defaultMedia}
                      alt="upload-media"
                      height='180'
                      src={defaultLink.length > 0 ? defaultLink : 'https://tse4-mm.cn.bing.net/th/id/OIP.EEoake0D7LrG5c4X4TDPFQHaHa?pid=ImgDet&rs=1'}
                    />
                  </CardActionArea>
                </Card>
                <HiddenInput
                  accept='image/*'
                  id='image-upload-btn'
                  type='file'
                  onChange={(event) => {
                    const file = event.target.files[0];
                    const fileRead = new FileReader();
                    fileRead.readAsDataURL(file);
                    fileRead.onload = (data) => {
                      setDefaultLink(data.target.result);
                      setDefaultMedia('img');
                    }
                  }}
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
                <VideoModal key={questions.qid} open={open} setOpen={setOpen} setDefaultMedia={setDefaultMedia} setDefaultLink={setDefaultLink}></VideoModal>
              </Box>
              <SelectionBox
                key={questions.qid}
                questions={questions}
                defaultType={defaultType}
                setDefaultType={setDefaultType}
                defaultAnswer={defaultAnswer}
                setDefaultAnswer={setDefaultAnswer}
                defaultOptions={defaultOptions}
                setDefaultOptions={setDefaultOptions}
              ></SelectionBox>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={4} md={4} lg={2}>
            <Paper className={classes.sidebar} elevation={3}>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Question Types
                </Typography>
                {
                  defaultType
                    ? (
                      <Typography variant='subtitle1' className={classes.text}>Single-select</Typography>
                      )
                    : (
                      <Typography variant='subtitle1' className={classes.text}>Multiple-select</Typography>
                      )
                }
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
                    name: 'timeLimit',
                    id: 'time-limit',
                  }}
                >
                  <option aria-label="5" value={5}>5s</option>
                  <option value={10}>10s</option>
                  <option value={15}>15s</option>
                  <option value={20}>20s</option>
                  <option value={25}>25s</option>
                  <option value={30}>30s</option>
                  <option value={35}>35s</option>
                  <option value={40}>40s</option>
                  <option value={45}>45s</option>
                  <option value={50}>50s</option>
                  <option value={55}>55s</option>
                  <option value={60}>60s</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <Typography variant='h6' className={classes.text}>
                    Points
                </Typography>
                <TextField
                  variant='outlined'
                  error={defaultPoint === '' || defaultPoint < 0}
                  helperText={defaultPoint === '' || defaultPoint < 0 ? 'Invalid points' : ''}
                  type='number'
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
