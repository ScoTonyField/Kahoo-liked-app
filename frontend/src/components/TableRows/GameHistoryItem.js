import {
  Button,
  TableCell,
  TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import makeAPIRequest from '../../Api';
import { toFriendlyFormat } from '../../TimeManipulation';

const GameHistoryItem = ({ sessionId }) => {
  const history = useHistory();
  const [sessionInfo, setSessionInfo] = React.useState(null);

  React.useEffect(() => {
    makeAPIRequest(`admin/session/${sessionId}/status`, 'GET', localStorage.getItem('token'), null, null)
      .then(res => setSessionInfo(res.results))
      .catch(err => console.log('Fail to fetch session information: ', err));
  }, []);

  // Handle 'view results' button to jump to the results page
  const handleClick = () => history.push(`/results/${sessionId}`)

  return (
    <TableRow hover key={sessionId}>
      { sessionInfo === null
        ? (
            <TableCell>Loading...</TableCell>
          )
        : (
            <>
              <TableCell component="th" scope="row">{sessionId}</TableCell>
              <TableCell align="right">{'' + sessionInfo.answerAvailable}</TableCell>
              <TableCell align="right">
                {sessionInfo.isoTimeLastQuestionStarted
                  ? toFriendlyFormat(sessionInfo.isoTimeLastQuestionStarted)
                  : 'Not Available'
                }</TableCell>
              <TableCell align="right">{sessionInfo.questions.length}</TableCell>
              <TableCell align="right">{sessionInfo.players.length}</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClick}
                >
                  View Results
                </Button>
              </TableCell>
            </>
          )
      }
    </TableRow>
  );
};

GameHistoryItem.propTypes = {
  sessionId: PropTypes.number
};

export default GameHistoryItem;
