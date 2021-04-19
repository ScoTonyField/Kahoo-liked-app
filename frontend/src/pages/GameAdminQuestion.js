import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import makeAPIRequest from '../Api';
import { useParams } from 'react-router-dom';

const GamePlayAdminQuestion = ({ question, setQuizPos }) => {
  const { quizid: quizId } = useParams();
  const [remainTime, setRemainTime] = React.useState();

  console.log(question);
  // get state from local storage in case user accidentally close the browser
  React.useEffect(() => {
    if (!remainTime) setRemainTime(+question.timeLimit);
    console.log('starting timer for q ', question.qid)
    const timer = window.setInterval(() => {
      // stop timer when timer hits 0, else keep decreasing
      setRemainTime(r => r <= 0 ? clearInterval(timer) : r - 1);
    }, 1000);
    return () => {
      console.log('stoping timer for q ', question.qid)
      clearInterval(timer);
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
      <p>{remainTime}</p>
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
  question: PropTypes.object,
  setQuizPos: PropTypes.func
}

export default GamePlayAdminQuestion;
