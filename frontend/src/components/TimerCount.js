import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import makeAPIRequest from '../Api';
/**
 * Timer component in GamePlayerQuestion pages
 * @param {props}  props
 * @returns
 */
const TimerCount = ({ playerId, question, setIsTimeOut, setFinalAnswerIds }) => {
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // display timeout message when timer completed
      return (
        <Typography
          variant="h6"
          color='secondary'
        >
          <b>Times Out!</b>
        </Typography>
      )
    } else {
      // display counting message when counting
      return (
        <Typography
          variant="h6"
          color={seconds < 5 ? 'secondary' : 'initial'} // change color into red when less than 5 sec
        >
          <b>Remain Time: {seconds}</b>
        </Typography>
      )
    }
  };

  React.useEffect(() => {
    // refresh answer when question change
    setIsTimeOut(false);
    setFinalAnswerIds([]);
  }, [question.isoTimeLastQuestionStarted])

  return (
    <Countdown
      date={new Date(question.isoTimeLastQuestionStarted).getTime() + question.timeLimit * 1000}
      onComplete={() => {
        setIsTimeOut(true);
        makeAPIRequest(`play/${playerId}/answer`, 'GET', null, null, null)
          .then(res => {
            setFinalAnswerIds(res.answerIds);
            if (!localStorage.getItem('answers')) {
              localStorage.setItem('answers', JSON.stringify([{
                answerIds: res.answerIds
              }]));
            } else {
              const currentAnswers = JSON.parse(localStorage.getItem('answers'));
              currentAnswers.push({
                answerIds: res.answerIds
              });
              localStorage.setItem('answers', JSON.stringify(currentAnswers));
            }
            if (!localStorage.getItem('questions')) {
              localStorage.setItem('questions', JSON.stringify([
                question
              ]))
            } else {
              const currentQuestions = JSON.parse(localStorage.getItem('questions'));
              currentQuestions.push(question);
              localStorage.setItem('questions', JSON.stringify(currentQuestions));
            }
          }).catch((err) => {
            console.log('ERROR: Fail to fetch answer', err)
          });
      }}
      renderer={renderer}
    />
  )
}

TimerCount.propTypes = {
  playerId: PropTypes.number,
  question: PropTypes.object,
  setIsTimeOut: PropTypes.func,
  setFinalAnswerIds: PropTypes.func,
}

export default TimerCount;
