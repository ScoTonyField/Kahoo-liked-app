import { Box, Container } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';

import React from 'react';
import Title from '../components/title/Title';
import PropTypes from 'prop-types';

const Dashboard = (props) => {
  // setPage('dashboard')
  // const history = useHistory();
  console.log('dashboard token: ', props.token);
  // if user not logged in, redirect to home page

  return (
    <Container>
      <Title>
        Dashboard
      </Title>
      {
        props.token
          ? (
              <Box component="span" m={1}>
                <p>content</p>
              </Box>
            )
          : (
              <p>You are not logged in, please login first.</p>
            )
      }

    </Container>
  );
};

Dashboard.propTypes = {
  token: PropTypes.string
};

export default Dashboard;
