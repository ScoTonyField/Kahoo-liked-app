import React from 'react';
import { Container } from '@material-ui/core';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';

// fetch question/answer every 1 second
const GamePlayPlayerQuestion = ({ setProgress }) => {
  const playerId = JSON.parse(localStorage.getItem('player')).id;
  // all the quiz data
  const [question, setQuestion] = React.useState({});
  // TODO: track remaining time, when time's up, fetch and display correct answer
  // until next question is displayed (i.e. question state is reset)
  // const [remainTime, setRemainTime] = React.useState();

  // fetch question every 1 second
  React.useEffect(() => {
    console.log('player question interval triggered, fetch question every 10 sec');
    const fetchQ = window.setInterval(() => {
      makeAPIRequest(`play/${playerId}/question`, 'GET', null, null, null)
        .then(res => {
          console.log('question: ', res);
          setQuestion(res.question);
          setProgress(0);
        }).catch((err) => {
          console.log('ERROR: Fail to fetch question', err)
          // when no more question, the quiz is done.
          setProgress(1);
        });
      console.log(new Date());
    }, 1000); // TODO: change time interval (1 sec prefered)

    return () => {
      console.log('stop player question interval');
      clearInterval(fetchQ);
    }
  }, []);

  return (
    <Container>
        {/* TODO: format this , display question, media (if any) and buttons to answer */}
        {JSON.stringify(question)}
    </Container>
  );
};

GamePlayPlayerQuestion.propTypes = {
  setProgress: PropTypes.func,
}

export default GamePlayPlayerQuestion;
