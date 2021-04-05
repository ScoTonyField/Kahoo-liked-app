import React from 'react';
import { Container } from '@material-ui/core';
import Title from '../components/title/Title';

const NotFound = (props) => {
  console.log(props)

  return (
    <Container>
        <Title>
            404 Not Found
        </Title>
    </Container>
  );
};

export default NotFound;
