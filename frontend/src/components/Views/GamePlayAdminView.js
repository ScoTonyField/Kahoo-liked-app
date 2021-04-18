import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Subtitle from '../Titles/Subtitle';
import PropTypes from 'prop-types';

// import makeAPIRequest from '../../Api';

const GamePlayerAdminView = ({ players }) => {
  const { sessionid: sessionId } = useParams();
  console.log(sessionId)

  // get session state
  // React.useEffect(() => {
  //   makeAPIRequest(`admin/session/${sessionId}/status`)
  // }, [])

  return (
    <Container>
      <Subtitle>Waiting for players...</Subtitle>
      <div>
        {
          players.map((p, idx) => (<Paper key={idx} elevation={3}>{p}</Paper>))
        }
        <Paper elevation={3}></Paper>
      </div>
    </Container>
  );
};

GamePlayerAdminView.propTypes = {
  players: PropTypes.array
};

export default GamePlayerAdminView;
