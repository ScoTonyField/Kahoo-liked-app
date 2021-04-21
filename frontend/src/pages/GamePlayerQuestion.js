import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import makeAPIRequest from '../Api';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import TimerCount from '../TimerCount';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

// fetch question/answer every 1 second
const GamePlayPlayerQuestion = ({ setProgress }) => {
  const classes = useStyles();
  const playerId = JSON.parse(localStorage.getItem('player')).id;

  const [question, setQuestion] = React.useState({});
  const [mediaTypes, setMediaTypes] = React.useState('img');
  const [options, setOptions] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [isTimeOut, setIsTimeOut] = React.useState(false);
  const [finalAnswerIds, setFinalAnswerIds] = React.useState([]);

  // question options click event, click to upload answer
  const handleToggle = (value) => {
    if (!isTimeOut) {
      console.log(checked);
      const currentIndex = checked.indexOf(value);
      let newChecked = [...checked];
      if (question.isSingle) {
        // single select logic
        if (currentIndex === -1) {
          newChecked = [];
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
      } else {
        // multiple select logic
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        console.log('Mutiple', newChecked);
      }
      // create array to store the answer selected by player
      const playerAnswersIds = [];
      for (let i = 0; i < newChecked.length; i++) {
        if (options.indexOf(newChecked[i]) !== -1) {
          // incase answers in last question push in the array
          playerAnswersIds.push(options.indexOf(newChecked[i]));
        }
      }

      const body = JSON.stringify({
        answerIds: playerAnswersIds.sort()
      })
      makeAPIRequest(`play/${playerId}/answer`, 'PUT', null, null, body)
        .then(() => {
          console.log('update successfully');
        })
        .catch(err => console.log('Something wrong happened while submitting', err))
      setChecked(newChecked);
    }
  };

  // fetch question every 1 second
  React.useEffect(() => {
    console.log('player question interval triggered, fetch question every 10 sec');
    const fetchQ = window.setInterval(() => {
      makeAPIRequest(`play/${playerId}/question`, 'GET', null, null, null)
        .then(res => {
          console.log('question: ', res);
          if (res.question.media.split('/')[0] === 'data:image' || res.question.media === '') {
            // check media type before display if media is image or empty -> 'img' type
            setMediaTypes('img');
          } else {
            setMediaTypes('iframe');
          }
          setQuestion(res.question);
          setOptions(res.question.options);
          setProgress(0);
        }).catch((err) => {
          console.log('ERROR: Fail to fetch question', err)
          // when no more question, the quiz is done.
          setProgress(-1);
        });
      console.log(new Date());
    }, 1000);

    return () => {
      console.log('stop player question interval');
      clearInterval(fetchQ);
    }
  }, []);

  if (Object.keys(question).length === 0) return <Typography variant='h5'><b>Data is loading...</b></Typography>

  return (
    <Container component='main' className={classes.root} id='main'>
      <TimerCount key={question} playerId={playerId} question={question} setIsTimeOut={setIsTimeOut} setFinalAnswerIds={setFinalAnswerIds} ></TimerCount>
      <Typography variant='h5'><b>{question.contents}</b></Typography>
      <Card>
        <CardActionArea>
          <CardMedia
            component={mediaTypes}
            alt="display-media"
            height={question.media.length > 0 ? '180' : '0'} // empty media not display
            src={question.media}
          />
        </CardActionArea>
      </Card>
      <Typography variant='h6'>{question.isSingle ? 'Select one' : 'Select one or more'}</Typography>
      <List>
        {options.map((value, index) => {
          return (
            <ListItem
              key={value}
              dense
              button
              onClick={() => handleToggle(value)}
            >
              <ListItemText>
                <Checkbox
                  disabled={isTimeOut}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': { index } }}
                />
                {value}
              </ListItemText>
              {
                finalAnswerIds.indexOf(index) !== -1
                  ? (
                      <ListItemIcon>{'correct answer: '}<CheckIcon color='secondary'></CheckIcon></ListItemIcon>
                    )
                  : (
                    <ListItemIcon></ListItemIcon>
                    )
              }
            </ListItem>
          )
        })}
      </List>
    </Container>
  );
};

GamePlayPlayerQuestion.propTypes = {
  setProgress: PropTypes.func,
}

export default GamePlayPlayerQuestion;
