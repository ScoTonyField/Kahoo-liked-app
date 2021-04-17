import { TextField, Box, Checkbox } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStlyes = makeStyles((theme) => ({
  answerBox: {
    margin: theme.spacing(2, 1, 0),
  },
  questionForm: {
    margin: theme.spacing(2, 2),
  },
  checkbox: {
    margin: theme.spacing(3, 1),
  }
}))

const SelectionBox = ({ questions, setDefaultType, defaultAnswer, setDefaultAnswer }) => {
  const handleChange = (event) => {
    const currentAnswer = defaultAnswer;
    if (event.target.checked) {
      currentAnswer.push(parseInt(event.target.id));
      if (currentAnswer.length > 1) {
        setDefaultType(false)
      } else {
        setDefaultType(true)
      }
    } else {
      currentAnswer.pop();
      if (currentAnswer.length > 1) {
        setDefaultType(false)
      } else {
        setDefaultType(true)
      }
    }
    setDefaultAnswer(currentAnswer);
  }

  const classes = useStlyes();
  const keys = Object.keys(questions);
  // console.log(keys);
  if (keys.length === 0) {
    questions = {
      options: [
        '', '', '', '', '', ''
      ]
    }
  }

  return (
    <Box
      display='flex'
      flexWrap='wrap'
      flexDirection='row'
      maxWidth='100%'
    >
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          required
          id='Q1'
          name='Q1'
          placeholder='Type your answer'
          defaultValue={questions.options[0]}
          className={classes.questionForm}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='1'
          className={classes.checkbox}
          onChange={handleChange}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          required
          id='Q2'
          name='Q2'
          placeholder='Type your answer'
          defaultValue={questions.options[1]}
          className={classes.questionForm}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='2'
          className={classes.checkbox}
          onChange={handleChange}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          // required
          id='Q3'
          name='Q3'
          placeholder='Optional answer'
          defaultValue={questions.options[2]}
          className={classes.questionForm}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='3'
          className={classes.checkbox}
          onChange={handleChange}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          // required
          id='Q4'
          name='Q4'
          placeholder='Optional answer'
          defaultValue={questions.options[3]}
          className={classes.questionForm}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='4'
          className={classes.checkbox}
          onChange={handleChange}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          // required
          id='Q5'
          name='Q5'
          placeholder='Optional answer'
          defaultValue={questions.options[4]}
          className={classes.questionForm}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='5'
          className={classes.checkbox}
          onChange={handleChange}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='25%'
        height='14%'
        className={classes.answerBox}
      >
        <TextField
          variant='outlined'
          // required
          id='Q6'
          name='Q6'
          placeholder='Optional answer'
          defaultValue={questions.options[5]}
          className={classes.questionForm}
          onChange={handleChange}
        >
        </TextField>
        <Checkbox
          // defaultChecked
          color='primary'
          id='6'
          className={classes.checkbox}
        />
      </Box>
    </Box>
  )
}

SelectionBox.propTypes = {
  questions: PropTypes.object,
  setDefaultType: PropTypes.func,
  defaultAnswer: PropTypes.array,
  setDefaultAnswer: PropTypes.func,
};

export default SelectionBox;
