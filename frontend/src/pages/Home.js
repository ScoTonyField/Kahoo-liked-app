import { Container } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ login }) => {
  console.log({ login })
  return (
    <Container>
        Homepage
        {!{ login } &&
            <p>Well come to BigBrain, please login or register.</p>
        }
    </Container>
  );
};

Home.propTypes = {
  login: PropTypes.bool.isRequired
};

export default Home;
