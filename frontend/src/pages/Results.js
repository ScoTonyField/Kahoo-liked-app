import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import { List } from 'react-content-loader'
import makeAPIRequest from '../Api';
import styled from 'styled-components';
import PlayerResultsTable from '../components/Tables/PlayerResultsTable';
import ChartsController from '../components/Charts/ChartsController';

const StyledUl = styled.ul`
  line-height: 2;
  font-size: 14pt;
`;

const Results = () => {
  const location = useLocation();
  const sessionId = location.pathname.split('/')[2];
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
                      <li>Starting Time: {new Date(quiz.isoTimeLastQuestionStarted).toString().split(' ').splice(0, 5).join(' ')}</li>
                      <li>Last Displayed Question: Quesion {quiz.position}</li>
                    </StyledUl>
                    <PlayerResultsTable results={results} questions={quiz.questions} />
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

export default Results;
