import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { List } from 'react-content-loader';

const GamePlayAdminQuestion = ({ question, timerActive, handleNext, pauseTimer }) => {
  if (question === undefined) return <List />
  // timer is initially active
  const [remainTime, setRemainTime] = React.useState();

  const stopTimer = (timer) => {
    setRemainTime(0);
    pauseTimer(false);
  }
  console.log('----------', question, remainTime);
  // React.useEffect(() => {
  //   setTimerActive(true);
  // }, [quizPos]);

  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    setRemainTime(question.timeLimit)
    const timer = window.setInterval(() => {
      // when timer is active, stop timer when timer hits 0, else keep decreasing
      if (timerActive && remainTime !== undefined) {
        const decre = remainTime - 1;
        console.log(decre)
        console.log('timer working')
        decre === 0 ? stopTimer(timer) : setRemainTime(r => r - 1);
      }
      // const decre = +remainTime - 1;
      // setRemainTime(decre === 0 ? stopTimer(timer) : decre);
    }, 1000);

    return () => {
      console.log('stoping timer for q ', question.qid)
      clearInterval(timer);
    }
  }, [])

  return (
    <>
      <p>Remain Time: {remainTime}</p>
      <p>question: {JSON.stringify(question)}</p>
      {/* XXX: UX: only when timer=0, admin can advance the q */}
      <Button
        disabled={remainTime > 0}
        variant="contained"
        onClick={handleNext}
      >
        NEXT
      </Button>
    </>
  );
};

GamePlayAdminQuestion.propTypes = {
  timerActive: PropTypes.bool,
  question: PropTypes.object,
  handleNext: PropTypes.func,
  pauseTimer: PropTypes.func,
}

export default GamePlayAdminQuestion;
