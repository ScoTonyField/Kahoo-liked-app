import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import makeAPIRequest from '../Api';
import { useParams } from 'react-router-dom';

const GamePlayAdminQuestion = ({ question, quizPos, setQuizPos }) => {
  const { quizid: quizId } = useParams();
  // timer is initially active
  const [timerActive, setTimerActive] = React.useState(true);
  const [remainTime, setRemainTime] = React.useState(question.timeLimit);

  const stopTimer = (timer) => {
    clearInterval(timer);
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

  // advance the question, and set position state to next
  const handleNext = () =>
    makeAPIRequest(`admin/quiz/${quizId}/advance`, 'POST', localStorage.getItem('token'), null, null)
      .then(res => {
        console.log('to ', res.stage)
        setQuizPos(res.stage)
      }).catch(err => console.log('ERROR: Fail to advance quiz, ', err))

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
  quizPos: PropTypes.number,
  question: PropTypes.object,
  setQuizPos: PropTypes.func
}

export default GamePlayAdminQuestion;
