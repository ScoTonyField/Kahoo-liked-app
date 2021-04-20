import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { List } from 'react-content-loader';
import Title from '../components/Titles/Title';

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
    display: props => props.remainTime <= 0 ? 'initial' : 'none',
  }
});

const sequenceNum = ['A', 'B', 'C', 'D', 'E', 'F'];

const GamePlayAdminQuestion = ({ question, quizPos, handleNext }) => {
  if (question === undefined) return <List/>
  // timer is initially active
  const [timerActive, setTimerActive] = React.useState(true);
  const [remainTime, setRemainTime] = React.useState(question.timeLimit);
  const classes = useStyles({ remainTime });

  const stopTimer = (timer) => {
    clearInterval(timer);
    setRemainTime(0);
    setTimerActive(false);
  }

  console.log('question', question);
  React.useEffect(() => {
    if (quizPos >= 0) setRemainTime(question.timeLimit);
  }, [quizPos])
  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    const timer = null;
    if (!remainTime) setRemainTime(+question.timeLimit);
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
      console.log('stoping timer for q ', question.qid)
      if (timer !== null) clearInterval(timer);
    }
  }, [])

  return (
    <>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Typography
          variant="h2"
          color={remainTime < 5 ? 'secondary' : 'initial'}
        >
          Remain Time: {remainTime}
        </Typography>
        <Typography
          variant="h2"
          className={classes.answerDiaplayText}
        >
          Answer Display!
        </Typography>
        {/* XXX: UX: only when timer=0, admin can advance the q */}
        <Button
          disabled={remainTime > 0}
          variant="contained"
          onClick={handleNext}
          size="large"
        >
          NEXT
        </Button>
      </Box>
      <Box p={3}>
        <Divider />
      </Box>
      <div>
        <Title>{question.contents}</Title>
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
  quizPos: PropTypes.number,
  question: PropTypes.object,
  handleNext: PropTypes.func
}

export default GamePlayAdminQuestion;
