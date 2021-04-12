import React from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import { List } from 'react-content-loader'
import makeAPIRequest from '../Api';
import PlayerRow from '../components/PlayerRow';

const Results = () => {
  const location = useLocation();
  const sessionId = location.pathname.split('/')[2];
  const [results, setResults] = React.useState();

  const fetchResults = (sessionId) =>
    makeAPIRequest(`admin/session/${sessionId}/results`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        setResults(res.results);
        console.log(results);
      }).catch(() => alert('Fail to fetch results'))

  fetchResults(sessionId);

  const playerTable = () =>
      <TableContainer component={Paper}>
          <Table aria-label="quiz history table">
            <TableHead>
              <TableRow>
                <TableCell>Player Name</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Number of Answers</TableCell>
                <TableCell align="right">Average Time to Answer</TableCell>
                <TableCell align="right"/>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                results.map((player, idx) => (
                  <PlayerRow key={idx} player={player} />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>

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
            results
              ? playerTable()
              // if results not loaded, display content loader
              : contentLoader()
          }
        </Box>
    </Container>
  );
};

export default Results;
