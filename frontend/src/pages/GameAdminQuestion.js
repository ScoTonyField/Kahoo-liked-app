import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Typography, CardMedia, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { List } from 'react-content-loader';
import ReactPlayer from 'react-player/youtube';
import Title from '../components/Titles/Title';
// import { calculateIsoTimeDiff } from '../TimeManipulation';

const useStyles = makeStyles({
  root: {
    width: 450,
    margin: '30px',
    padding: '30px',
    fontSize: '30pt',
    overflowWrap: 'break-word',
    fontWeight: 100,
  },
  answer: {
    fontWeight: props => props.remainTime <= 0 ? 800 : 100,
  },
  answerDiaplayText: {
    color: '#303F9F',
    display: props => props.remainTime <= 0 ? 'initial' : 'none',
  },
  timer: {
    color: props => props.remainTime < 5 ? '#FF5252' : '#303F9F'
  },
  media: {
    width: '700px',
    margin: 'auto'
  },
  divider: {
    borderTop: '1px solid lightgrey',
  }
});

const sequenceNum = ['A', 'B', 'C', 'D', 'E', 'F'];

const GamePlayAdminQuestion = ({ question, handleNext, lastTimeStarted }) => {
  if (!question || !lastTimeStarted) return <List/>
  // timer is initially active
  const [timerActive, setTimerActive] = React.useState(true);
  console.log(question)
  // the time is depends on backend's start time
  const timeDiff = parseInt((new Date(lastTimeStarted).getTime() + (+question.timeLimit + 1) * 1000 -
                    new Date().getTime()) / 1000);
  console.log(new Date(), lastTimeStarted)
  const [remainTime, setRemainTime] = React.useState(timeDiff <= 0 ? 0 : timeDiff);
  const classes = useStyles({ remainTime });

  const stopTimer = (timer) => {
    clearInterval(timer);
    setRemainTime(0);
    setTimerActive(false);
  }

  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    const timer = null;
    if (!remainTime) setRemainTime(timeDiff <= 0 ? 0 : timeDiff);
    console.log('starting timer for q ', question.qid)
    // if timer is Active, countdown
    if (timerActive) {
      const timer = window.setInterval(() => {
        // stop timer when timer hits 0, else keep decreasing
        setRemainTime(r => r <= 0 ? stopTimer(timer) : r - 1);
      }, 1000);
    } else {
      setRemainTime(0);
    }
    return () => {
      console.log('stoping admin question', question.qid)
      if (timer !== null) clearInterval(timer);
    }
  }, [])

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        p={3}
      >
        <Typography
          variant="h2"
          className={classes.timer}
        >
          Remain Time: {remainTime}
        </Typography>
        <Typography
          variant="h2"
          className={classes.answerDiaplayText}
        >
          Answer Displayed!
        </Typography>
        {/* XXX: UX: only when timer=0, admin can advance the q */}
        <Button
          disabled={remainTime > 0}
          variant="contained"
          onClick={handleNext}
          size="large"
          color="primary"
        >
          NEXT
        </Button>
      </Box>
      {/* <Divider className={classes.divider}/> */}
      {
        question.media !== '' &&
          <Card className={classes.media}>
            <CardContent>
            {
              question.media.includes('data:image') &&
                (
                  <CardMedia
                    component='img'
                    alt="Question Media"
                    src={question.media}
                    title="Question Media"
                  />
                )
            }
            {
              question.media.includes('youtube') &&
                (
                  <ReactPlayer url={question.media} controls={true} />
                )
            }
            </CardContent>
          </Card>
      }
      <div>
        <Title color="#303F9F">{question.contents}</Title>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
        >
          {
            question.options.map((option, index) => (
              <Card
                key={index}
                elevation={5}
                className={ `${classes.root} ${question.answers.indexOf(index) > -1 ? classes.answer : ''}` }
              >
                { `${sequenceNum[index]}. ${option}`}
              </Card>
            ))
          }
        </Box>
      </div>
    </>
  );
};

GamePlayAdminQuestion.propTypes = {
  question: PropTypes.object,
  handleNext: PropTypes.func,
  lastTimeStarted: PropTypes.string,
}

export default GamePlayAdminQuestion;
