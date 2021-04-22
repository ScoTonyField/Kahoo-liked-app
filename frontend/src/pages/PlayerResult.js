import React from 'react';
import makeAPIRequest from '../Api';
// import { List } from 'react-content-loader';
import PropTypes from 'prop-types';
import Subtitle from '../components/Titles/Subtitle';
// import PlayerResultModal from '../components/Modals/PlayerResultModal';
import {
  Container,
  Paper,
  List,
  // ListItem,
  // ListItemText,
  // ListItemIcon,
} from '@material-ui/core';
// import CheckIcon from '@material-ui/icons/Check';
// import ClearIcon from '@material-ui/icons/Clear';

const PlayerResult = ({ playerId }) => {
  // a list of result (1 per question)
  const [result, setResult] = React.useState([]);
  const [player, setPlayer] = React.useState({});
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
    const p = {};
    p.anwers = sessionStorage.getItem('answers');
    p.questions = sessionStorage.getItem('questions');
    p.score = p.answers.reduce((a, b, indx) => {
      const pointsCurrentQuestion = b.correct ? +p.questions[indx].points : 0;
      return a + +pointsCurrentQuestion;
    }, 0);
    p.avgTime = p.answers.reduce((a, b, indx) => {
      const pointsCurrentQuestion = b.correct ? +p.questions[indx].points : 0;
      return a + +pointsCurrentQuestion;
    }, 0);
    setPlayer(p);
    console.log((result));
  }, [])

  // XXX: UX content loader
  if (Object.keys(player).length === 0) return <List />

  return (
    <Container>
      <Paper elevation={3}>
        <Subtitle><b>Well done! View your result below.</b></Subtitle>
        {/* <PlayerResultModal key={player} player={player} questions={player.questions}></PlayerResultModal> */}
        {/* <List>
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
                  {'answers'}
                </ListItemText>
                <ListItemIcon>
                  {'points'}
                </ListItemIcon>
              </ListItem>
            )
          })}
        </List> */}
      </Paper>
    </Container>
  );
};

PlayerResult.propTypes = {
  playerId: PropTypes.number
}

export default PlayerResult;
