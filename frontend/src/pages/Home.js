import { Container } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ token }) => {
  console.log('Directing to Homepage, token: ' + token)
  return (
    <Container>
        Homepage
        {!token &&
            <p>Well come to BigBrain, please login or register.</p>
        }
    </Container>
  );
};

Home.propTypes = {
  token: PropTypes.string.isRequired
};

export default Home;
