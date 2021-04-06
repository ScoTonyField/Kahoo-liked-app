import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 'fit-content',
    margin: '20px auto',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const GameCard = ({ gameInfo }) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
                Title
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            adjective
            </Typography>
            <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

GameCard.propTypes = {
  gameInfo: PropTypes.object,
};

export default GameCard;
