import { Container } from '@material-ui/core';
import React from 'react';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';

const Home = () => {
  return (
    <Container>
        <Title>
          Homepage
        </Title>
        {
          localStorage.getItem('token')
            ? <Subtitle>You have logged in, go to dashboard to see your quizzes. :D</Subtitle>
            : <Subtitle>Well come to BigBrain, please login or register.</Subtitle>
        }
    </Container>
  );
};

export default Home;
