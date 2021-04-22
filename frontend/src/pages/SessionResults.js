import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import { List } from 'react-content-loader'
import makeAPIRequest from '../Api';
import styled from 'styled-components';
import PlayerOverviewTable from '../components/Tables/PlayerOverviewTable';
import ChartsController from '../components/Charts/ChartsController';
import { toFriendlyFormat } from '../TimeManipulation';

const StyledUl = styled.ul`
  line-height: 2;
  font-size: 14pt;
`;

const SessionResults = () => {
  const { sessionid: sessionId } = useParams();
  const [results, setResults] = React.useState();
  const [quiz, setQuiz] = React.useState();

  const fetchQuiz = (sessionId) =>
    makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        setQuiz(res.results);
        console.log(res.results);
      }).catch(() => alert('Fail to fetch quiz details.'));

  const fetchResults = (sessionId) =>
    makeAPIRequest(`admin/session/${sessionId}/results`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        setResults(res.results);
        console.log(res.results);
      }).catch(() => alert('Fail to fetch results.'))

  React.useEffect(() => {
    fetchQuiz(sessionId);
    fetchResults(sessionId);
  }, [])

  const lastQuestion = () => {
    if (quiz.position < 0) return 'Quiz Not Started';
    else if (quiz.position === 0) return 'Lobby';
    else return `Question ${quiz.position}`;
  }

  const startTime = () =>
    quiz.isoTimeLastQuestionStarted === null
      ? 'Quiz Not Started'
      : toFriendlyFormat(quiz.isoTimeLastQuestionStarted)

  const contentLoader = () => <List />
  return (
    <Container>
        <Title>
            Results
        </Title>
        <Subtitle>
          Results for game session: {sessionId}
        </Subtitle>
        <Box>
          {
            results && quiz
              ? (
                  <>
                    <h2>Summary</h2>
                    <StyledUl>
                      <li>Number of players: {quiz.players.length}</li>
                      <li>Number of questions: {quiz.questions.length}</li>
                      <li>Starting Time: {startTime()}</li>
                      <li>Last Displayed State: {lastQuestion()}</li>
                    </StyledUl>
                    <PlayerOverviewTable results={results} questions={quiz.questions} />
                    <ChartsController players={results} questions={quiz.questions} />
                  </>
                )
                // if results not loaded, display content loader
              : contentLoader()
          }
        </Box>
    </Container>
  );
};

export default SessionResults;
