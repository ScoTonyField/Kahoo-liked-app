import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactPlayer from 'react-player/youtube';
import FileUploadBtn from '../Buttons/FileUploadBtn';
import { toFriendlyFormat } from '../../TimeManipulation';
import Subtitle from '../Titles/Subtitle';
import makeAPIRequest from '../../Api';

const ImportModal = ({ games, setGames }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for opening the 'import gmae data' modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler for closing the 'import gmae data' modal
  const handleClose = () => {
    setData();
    setOpen(false);
  };

  // Handler for submitting the data to create new game
  const handleSubmit = () => {
    setOpen(false);
    setLoading(true);
    let quizid = null;
    const newQuizBody = { name: data.name }
    const putQuzBody = {
      questions: data.questions,
      name: data.name,
      thumbnail: data.thumbnail,
    }
    makeAPIRequest('admin/quiz/new', 'POST', localStorage.getItem('token'), null, JSON.stringify(newQuizBody))
      .then(res => {
        makeAPIRequest(`admin/quiz/${res.quizId}`, 'PUT', localStorage.getItem('token'), null, JSON.stringify(putQuzBody))
        quizid = res.quizId;
      }).then(() => {
        alert('Successfully import a quiz!');
        if (quizid != null) setGames([...games, parseInt(quizid)]);
      }).catch((err) => {
        if (err.status === 403) {
          alert('ERROR: Fail to import game. Invalid token.')
        } else if (err.status === 400) {
          console.log('ERROR: Fail to import game. Invalid input', err)
        } else {
          alert('ERROR: Fail to import game.')
        }
      }).finally(() => setLoading(false))
  }

  if (loading) {
    return (
      <Dialog
        open={true}
        aria-labelledby='loading-dialog-title'
        aria-describedby='loading-dialog-description'
      >
        <DialogTitle id="loading-dialog-title">Importing Games</DialogTitle>
        <DialogContent>
          <DialogContentText id="loading-dialog-description">
            Please wait patiently. Thank you :)
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <div>
       <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary">
        Import Quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth='md'
        fullWidth
        aria-labelledby="create-new-quiz-title"
      >
        <DialogTitle id="create-new-quiz-title">
          Import Game Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make a new quiz, please upload the <b>json</b> file that contains game data
          </DialogContentText>

          <FileUploadBtn fileType=".json" setData={setData}/>
          {
            // quiz data preview
            data && (
              <Box display='flex' flexDirection='column'>
                <Subtitle>Quiz Preview</Subtitle>
                <Typography variant='h6'>Quiz Name</Typography>
                <Typography variant='body1'>{data.name}</Typography>

                <Typography variant='h6'>Created At (Will be overwritten by new created time)</Typography>
                <Typography variant='body1'>{toFriendlyFormat(data.createdAt)}</Typography>

                <Typography variant='h6'>Thumbnail</Typography>
                {
                  data.thumbnail === null
                    ? <Typography variant='body1'>No Thumbnail</Typography>
                    : <img width='60%' src={data.thumbnail}/>
                }
                <Typography variant='h6'>Number of Questions</Typography>
                <Typography variant='body1'>{data.questions.length}</Typography>

                <Typography variant='h6'>Questions</Typography>
                {
                  // quiz question preview
                  data.questions.map((q, idx) => (
                    <div key={idx}>
                      <Typography variant='subtitle1'>
                        <b>
                          {`${idx + 1}. ${q.contents} [${q.isSingle ? 'Single Choice' : 'Multiple Choices'} / ${q.timeLimit}s / ${q.points}pts]`}
                        </b>
                      </Typography>
                      <Box display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box>
                          {
                            // display options to each question
                            q.options.map((o, idx) => (
                              <li key={idx} style={{ marginLeft: '20px' }}>
                                {
                                  q.answers.indexOf(idx) > -1
                                    ? `${o} ✔`
                                    : o
                                }
                              </li>
                            ))
                          }
                        </Box>
                        {
                          // if the question contains media, display thumbnail
                          q.media !== '' &&
                            <Box>
                              {
                                q.media.includes('data:image')
                                  ? <img height='100px' src={q.media}/>
                                  : <ReactPlayer height='100px' width='300px' url={q.media} controls={true} />
                              }
                            </Box>
                        }
                      </Box>
                    </div>
                  ))
                }
              </Box>
            )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ImportModal.propTypes = {
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default ImportModal;
