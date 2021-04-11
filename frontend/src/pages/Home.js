import { Container } from '@material-ui/core';
import React from 'react';
import Title from '../components/Titles/Title';
import Subtitle from '../components/Titles/Subtitle';

const Home = () => {
  const token = localStorage.getItem('token');
  console.log('Directing to Homepage, token: ' + token)
  return (
    <Container>
        <Title>
          Homepage
        </Title>
        {
          token
            ? (
                <Subtitle>You have logged in, go to dashboard to see your quizzes. :D</Subtitle>
              )
            : (
                  <Subtitle>Well come to BigBrain, please login or register.</Subtitle>
              )
        }
    </Container>
  );
};

export default Home;
