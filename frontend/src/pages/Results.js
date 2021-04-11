import React from 'react';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';
import makeAPIRequest from '../Api';

const Results = () => {
  const location = useLocation();
  const sessionId = location.pathname.split('/')[2];
  const [results, setResults] = React.useState();

  const fetchResults = (sessionId) =>
    makeAPIRequest(`admin/session/${sessionId}/results`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => {
        setResults(res);
      }).catch(() => alert('Fail to fetch results'))

  React.useEffect(() => {
    fetchResults(sessionId);
  }, []);

  console.log(results);

  return (
    <Container>
        <Title>
            Results
        </Title>
        <Subtitle>
          Results for game session: {sessionId}
        </Subtitle>
    </Container>
  );
};

export default Results;
