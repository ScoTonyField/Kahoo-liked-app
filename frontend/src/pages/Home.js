import { Container } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Title from '../components/title/Title';

const Home = (props) => {
  const token = props.token;
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

Home.propTypes = {
  token: PropTypes.string
};

export default Home;
