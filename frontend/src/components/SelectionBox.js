import { TextField, Box, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
/**
 * return 6 option box for admin to edit in current question
 * @param {props} props
 * @returns
 */
const SelectionBox = ({ questions, setDefaultType, defaultAnswer, setDefaultAnswer, defaultOptions, setDefaultOptions }) => {
  const [disabledOne, setDisabledOne] = useState(true);
  const [disabledTwo, setDisabledTwo] = useState(true);
  const [disabledThree, setDisabledThree] = useState(true);
  const [disabledFour, setDisabledFour] = useState(true);
  const [disabledFive, setDisabledFive] = useState(true);
  const [disabledSix, setDisabledSix] = useState(true);

  useEffect(() => {
    if (questions.options[0]) {
      setDisabledOne(false);
    }
    if (questions.options[1]) {
      setDisabledTwo(false);
    }
    if (questions.options[2]) {
      setDisabledThree(false);
    }
    if (questions.options[3]) {
      setDisabledFour(false);
    }
    if (questions.options[4]) {
      setDisabledFive(false);
    }
    if (questions.options[5]) {
      setDisabledSix(false);
    }
    const currentOptions = questions.options;
    let cnt = questions.options.length;
    while (cnt < 6) {
      currentOptions.push('');
      cnt++;
    }
    setDefaultOptions(currentOptions);
  }, [])

  const handleChange = (event) => {
    const currentAnswer = defaultAnswer;
    if (event.target.checked) {
      currentAnswer.push(parseInt(event.target.id) - 1);
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
  if (keys.length === 0) {
    questions = {
      options: [],
      answers: []
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
          onChange={(event) => {
            if (event.target.value) {
              const newDefaultOptions = defaultOptions;
              newDefaultOptions.splice(0, 1, event.target.value);
              setDefaultOptions(newDefaultOptions);
              setDisabledOne(false);
            } else {
              const newDefaultOptions = defaultOptions;
              newDefaultOptions.splice(0, 1, '');
              setDefaultOptions(newDefaultOptions);
              setDisabledOne(true);
            }
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedOne}
          disabled={disabledOne}
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
          onChange={(event) => {
            const newDefaultOptions = defaultOptions;
            newDefaultOptions.splice(1, 1, event.target.value);
            setDefaultOptions(newDefaultOptions);
            setDisabledTwo(false);
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedTwo}
          disabled={disabledTwo}
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
          onChange={(event) => {
            const newDefaultOptions = defaultOptions;
            newDefaultOptions.splice(2, 1, event.target.value);
            (newDefaultOptions);
            setDefaultOptions(newDefaultOptions);
            setDisabledThree(false);
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedThree}
          disabled={disabledThree}
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
          onChange={(event) => {
            const newDefaultOptions = defaultOptions;
            newDefaultOptions.splice(3, 1, event.target.value);
            setDefaultOptions(newDefaultOptions);
            setDisabledFour(false);
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedFour}
          disabled={disabledFour}
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
          onChange={(event) => {
            const newDefaultOptions = defaultOptions;
            newDefaultOptions.splice(4, 1, event.target.value);
            setDefaultOptions(newDefaultOptions);
            setDisabledFive(false);
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedFive}
          disabled={disabledFive}
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
          onChange={(event) => {
            const newDefaultOptions = defaultOptions;
            newDefaultOptions.splice(5, 1, event.target.value);
            setDefaultOptions(newDefaultOptions);
            setDisabledSix(false);
          }}
        >
        </TextField>
        <Checkbox
          // checked={checkedSix}
          disabled={disabledSix}
          color='primary'
          id='6'
          className={classes.checkbox}
          onChange={handleChange}
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
  defaultOptions: PropTypes.array,
  setDefaultOptions: PropTypes.func,
};

export default SelectionBox;
