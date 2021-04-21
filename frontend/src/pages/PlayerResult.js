import React from 'react';
import makeAPIRequest from '../Api';
// import { List } from 'react-content-loader';
import PropTypes from 'prop-types';
import Subtitle from '../components/Titles/Subtitle';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const PlayerResult = ({ playerId }) => {
  // a list of result (1 per question)
  const [result, setResult] = React.useState([]);
  // const [defaultOptions, setDefaultOptions] = useState([])
  // const [defaultPoints, setDefaultPoints] = useState(0);

  // TODO: get player's answer contents
  // const getOption = (answerIds) => {
  //   // check if player answers are empty
  //   if (answerIds.length === 0) return 'You haven\'t answer in this question';

  //   makeAPIRequest(`play/${playerId}/question`, 'GET', null, null, null)
  //     .then(res => {
  //       if (answerIds.length === 1) {
  //         return res.options[answerIds];
  //       } else {
  //         let totalAnswers = '';
  //         for (let i = 0; i < answerIds.length; i++) {
  //           if (i === answerIds.length - 1) {
  //             totalAnswers += res.options[parseInt(answerIds[i])];
  //           } else {
  //             totalAnswers = totalAnswers + ', ' + res.options[parseInt(answerIds[i])];
  //           }
  //         }
  //       }
  //     })
  // }

  // const getPoints = (answerIds) => {
  //   makeAPIRequest(`play/${playerId}/question`, 'GET', null, null, null)
  //     .then(res => {
  //       if (answerIds.length === 0) {
  //         return res.points;
  //       }
  //     })
  //   // TODO: points system
  // }

  React.useEffect(() => {
    makeAPIRequest(`play/${playerId}/results`, 'GET', null, null, null)
      .then(res => setResult(res))
      .catch(err => console.log('ERROR: error fetching player result: ', err));
  }, [])

  // XXX: UX content loader
  if (result.length === 0) return <List />

  return (
    <Container>
      <Paper elevation={3}>
        <Subtitle><b>Well done! View your result below.</b></Subtitle>
        <List>
          {result.map((value, index) => {
            return (
              <ListItem key={index} dense button >
                <ListItemIcon>
                  {
                    value.correct
                    // show correctness of current question
                      ? (
                        <CheckIcon color='primary' />
                        )
                      : (
                        <ClearIcon color='secondary' />
                        )
                  }
                </ListItemIcon>
                <ListItemText>
                  {/* {JSON.stringify(value)} */}
                  {/* {getOption(value.answerIds)} */}
                  {'answers'}
                </ListItemText>
                <ListItemIcon>
                  {/* TODO: add points and points system */}
                  {'points'}
                </ListItemIcon>
              </ListItem>
            )
          })}
        </List>
        {/* {
          result.map((r, idx) =>
            <p key={idx}>{JSON.stringify(r)}</p>
          )
        } */}
      </Paper>
    </Container>
  );
};

PlayerResult.propTypes = {
  playerId: PropTypes.number
}

export default PlayerResult;
