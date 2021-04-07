import { Container } from '@material-ui/core';
import React from 'react';
import Title from '../components/title/Title';

const Home = () => {
  const token = localStorage.getItem('token');
  console.log('Directing to Homepage, token: ' + token)
  return (
    <Container>
        <Title>
          Homepage
        </Title>
        {!token &&
            <p>Well come to BigBrain, please login or register.</p>
        }
    </Container>
  );
};

export default Home;
