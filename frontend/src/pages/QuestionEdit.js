import { FormControl, Select, Typography, TextField, Divider, Button, Box, Checkbox } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Title from '../components/Titles/Title';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import styled from 'styled-components';
// import FileUploadBtn from '../components/Buttons/FileUploadBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
    height: '90vh'
  },
  sidebar: {
    padding: theme.spacing(2, 0),
    textAlign: 'left',
    height: '100%'
  },
  main: {
    padding: theme.spacing(2, 3),
    height: '100%',
    // textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1, 3),
    width: '80%',
  },
  text: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(2, 3),
    width: '80%',
    height: '50px',
  },
  content: {
    margin: theme.spacing(2, 0),
  },
  media: {
    margin: theme.spacing(2, 'auto', 0),
    color: 'grey',
    textAlign: 'center'
  },
  mediaButton: {
    margin: theme.spacing(5, 2, 0),
    width: '40%',
    height: '50px'
  },
  mediaIcon: {
    margin: theme.spacing(10, 0, 2),
    fontSize: 'xx-large'
  },
  answerBox: {
    margin: theme.spacing(2, 2, 0)
  },
  questionForm: {
    margin: theme.spacing(2, 3),
  },
  checkbox: {
    margin: theme.spacing(3, 2),
  }
}));

const HiddenInput = styled.input`
  display: none;
`;

const QuestionEdit = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={10}>
        <Paper className={classes.main} elevation={3}>
          {/* Type questions */}
          <Typography variant="h6">Edit your question</Typography>
          <TextField
            variant='outlined'
            id='content'
            name='content'
            placeholder='Start typing your question'
            fullWidth
            className={classes.content}
          >
          </TextField>
          <Box
            border={1}
            borderColor='lightgrey'
            borderRadius='borderRadius'
            minHeight='40%'
            minWidth='45%'
            className={classes.media}
          >
            <WallpaperIcon color='disabled' className={classes.mediaIcon}/>
            <Typography variant='body1'>
              Click following button to upload your attached media
            </Typography>
            <HiddenInput
              accept='image/*'
              id='image-upload-btn'
              type='file'
            />
            <label htmlFor="image-upload-btn">
              <Button
                variant='contained'
                color='primary'
                component='span'
                className={classes.mediaButton}
              >
                Image
              </Button>
            </label>
            <Button
              variant='contained'
              color='primary'
              className={classes.mediaButton}
            >
              Youtube Link
            </Button>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
          >
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionOne'
                name='questionOne'
                placeholder='Type your answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question one' }}
                className={classes.checkbox}
              />
            </Box>
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionTwo'
                name='questionTwo'
                placeholder='Type your answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question two' }}
                className={classes.checkbox}
              />
            </Box>
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionThree'
                name='questionThree'
                placeholder='Optional answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question three' }}
                className={classes.checkbox}
              />
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
          >
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionFour'
                name='questionFour'
                placeholder='Optional answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question four' }}
                className={classes.checkbox}
              />
            </Box>
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionFive'
                name='questionFive'
                placeholder='Optional answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question five' }}
                className={classes.checkbox}
              />
            </Box>
            <Box
              border={1}
              borderColor='lightgrey'
              borderRadius='borderRadius'
              width='30%'
              height='14%'
              className={classes.answerBox}
            >
              <TextField
                variant='outlined'
                required
                id='qutionSix'
                name='questionSix'
                placeholder='Optional answer'
                className={classes.questionForm}
              >
              </TextField>
              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'question six' }}
                className={classes.checkbox}
              />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.sidebar} elevation={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Typography variant='h6' className={classes.text}>
                Answer options
            </Typography>
            <Select
              native
              inputProps={{
                name: 'questionTypes',
                id: 'question-type',
              }}
            >
              <option aria-label="single-select" value={true}>Single select</option>
              <option value={false}>Multi-select</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <Typography variant='h6' className={classes.text}>
                Time limit
            </Typography>
            <Select
              native
              inputProps={{
                name: 'timelimit',
                id: 'time-limit',
              }}
            >
              <option aria-label="5" value={5}>5s</option>
              <option value={10}>10s</option>
              <option value={15}>15s</option>
              <option value={20}>20s</option>
              <option value={25}>25s</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <Typography variant='h6' className={classes.text}>
                Points
            </Typography>
            <TextField
              variant='outlined'
              required
              id='points'
              name='points'
            >
            </TextField>
          </FormControl>
          <Divider className={classes.divider} />
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Add answers
          </Button>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
          >
            Submit
          </Button>
          <Button
            variant='contained'
            color='default'
            className={classes.button}
          >
            Reset
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuestionEdit;
