import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import makeAPIRequest from '../Api';
import StartGameBtn from './Buttons/StartGameBtn';
// import makeAPIRequest from '../Api';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '20px 15px',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)'
    }
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '30px',
  },
  list: {
    paddingLeft: 'inherit',
  },
  media: {
    height: 140,
  },
  pos: {
    marginBottom: 12,
  },
});

const GameCard = ({ gameInfo, games, setGames }) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(Boolean(gameInfo.active));

  const handleDelete = () =>
    makeAPIRequest(`admin/quiz/${gameInfo.id}`, 'DELETE', localStorage.getItem('token'), null, null)
      .then(() => {
        alert('Successfully delete quiz ' + gameInfo.name);
        const newGames = [...games];
        newGames.splice(games.indexOf(gameInfo), 1);
        console.log(newGames);
        setGames(newGames);
      }).catch(err => console.log('ERROR: Fail to delete quiz: ', err))

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea>
         <CardMedia
            className={classes.media}
            image={gameInfo.thumbnail ?? 'https://tse4-mm.cn.bing.net/th/id/OIP.EEoake0D7LrG5c4X4TDPFQHaHa?pid=ImgDet&rs=1'}
            title="Quiz Thumbnail"
          />
        <CardContent>
            <Typography
              variant="h6"
              color={active ? 'initial' : 'error'}
              gutterBottom
            >
              {active ? 'Active' : 'Inactive'}
            </Typography>
            <Typography
              className={classes.name}
              variant="h5"
              component="h2">
                {gameInfo.name ?? '[Empty Name]'}
            </Typography>
            <ul className={classes.list}>
              <li>
                <Typography variant="body2" component="p" className={classes.pos} color="textSecondary" >
                  {'Created at: ' + new Date(gameInfo.createdAt).toString().split(' ').splice(0, 5).join(' ')}
                </Typography>
              </li>
              <li>
                <Typography variant="body2" component="p" className={classes.pos} color="textSecondary" >
                  {'Numer of questions: ' + gameInfo.questions.length}
                </Typography>
              </li>
              <li>
                <Typography variant="body2" component="p" className={classes.pos} color="textSecondary" >
                  {'Total time to complete: ' + gameInfo.questions.length}
                  {/* TODO: calculate time */}
                </Typography>
              </li>
            </ul>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <StartGameBtn
          gameId={gameInfo.id}
          sessionId={gameInfo.active}
          active={active}
          setActive={setActive}
        />
        <Button size="medium" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

GameCard.propTypes = {
  gameInfo: PropTypes.object,
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default GameCard;
