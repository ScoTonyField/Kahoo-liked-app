import { TextField, Box, Checkbox } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStlyes = makeStyles((theme) => ({
  answerBox: {
    margin: theme.spacing(2, 2, 0)
  },
  questionForm: {
    margin: theme.spacing(2, 3),
  },
  checkbox: {
    margin: theme.spacing(3, 2),
  }
}))

const SelectionBoxModal = ({ questions }) => {
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
        minWidth='30%'
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
          defaultChecked
          color='primary'
          id='checkbox1'
          className={classes.checkbox}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='30%'
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
          defaultChecked
          color='primary'
          id='checkbox2'
          className={classes.checkbox}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='30%'
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
          defaultChecked
          color='primary'
          id='checkbox3'
          className={classes.checkbox}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='30%'
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
          defaultChecked
          color='primary'
          id='checkbox4'
          className={classes.checkbox}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='30%'
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
          defaultChecked
          color='primary'
          id='checkbox5'
          className={classes.checkbox}
        />
      </Box>
      <Box
        border={1}
        borderColor='lightgrey'
        borderRadius='borderRadius'
        minWidth='30%'
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
        >
        </TextField>
        <Checkbox
          defaultChecked
          color='primary'
          id='checkbox6'
          className={classes.checkbox}
        />
      </Box>
    </Box>
  )
}

SelectionBoxModal.propTypes = {
  questions: PropTypes.object,
};

export default SelectionBoxModal;
