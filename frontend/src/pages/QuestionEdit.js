import { Box } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Title from '../components/Titles/Title'
import Subtitle from '../components/Titles/Subtitle';

const QuestionEdit = () => {
  const location = useLocation();
  const quizId = location.pathname.split('/')[2];
  const questionId = location.pathname.split('/')[3];

  return (
    <Box>
      <Title>
          Question Edit
      </Title>
      <Subtitle>
        Editing question {questionId} in quiz {quizId}
      </Subtitle>
    </Box>
  );
};

export default QuestionEdit;
