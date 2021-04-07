import React from 'react';
import { Container } from '@material-ui/core';
import Title from '../components/title/Title';
import Subtitle from '../components/title/Subtitle';

const NotFound = (props) => {
  console.log(props)

  return (
    <Container>
        <Title>
          404 Not Found
        </Title>
        <Subtitle>
          Opps! Page not exists :O
        </Subtitle>
    </Container>
  );
};

export default NotFound;
