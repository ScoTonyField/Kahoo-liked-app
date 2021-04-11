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
import { List } from 'react-content-loader';
import makeAPIRequest from '../Api';
import ToggleGameBtn from './Buttons/ToggleGameBtn';
import GameHistory from './Modals/GameHistoryModal';
// import makeAPIRequest from '../Api';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '20px 15px',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
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

const GameCard = ({ gid, games, setGames }) => {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = React.useState();
  const [active, setActive] = React.useState(false);

  // Each time start/stop the game, refetch information to get the session id
  React.useEffect(() => {
    makeAPIRequest(`admin/quiz/${gid}`, 'GET', localStorage.getItem('token'), null, null)
      .then(game => {
        game.id = gid;
        setGameInfo(game);
      }).catch(err => console.log('Error fetching quizzes: ', err))
  }, [active])

  // each time game info update, update the active status
  React.useEffect(() => {
    if (gameInfo) {
      setActive(Boolean(gameInfo.active));
    }
  }, [gameInfo])

  // if gameInfo is not loaded, show "loading..." in that card
  // XXX: UX: notify system loading status
  if (!gameInfo) {
    return (
      <Card variant="outlined" className={classes.root}>
        <List />
      </Card>
    )
  }

  const handleDelete = () =>
    makeAPIRequest(`admin/quiz/${gid}`, 'DELETE', localStorage.getItem('token'), null, null)
      .then(() => {
        alert('Successfully delete quiz: ' + gameInfo.name);
        const newGames = [...games];

        // remove game from the list and set new state
        newGames.splice(games.indexOf(gid), 1);
        setGames(newGames);
      }).catch(err => console.log('ERROR: Fail to delete quiz: ', err))

  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea href={`/quiz/${gid}`}>
         <CardMedia
            className={classes.media}
            image={gameInfo.thumbnail ?? 'https://tse4-mm.cn.bing.net/th/id/OIP.EEoake0D7LrG5c4X4TDPFQHaHa?pid=ImgDet&rs=1'}
            title="Quiz Thumbnail"
          />
        <CardContent>
            <Typography
              variant="h6"
              color={active ? 'primary' : 'secondary'}
              gutterBottom
            >
              {active ? 'Active' : 'Inactive'}
            </Typography>
            <Typography
              className={classes.name}
              variant="h5"
              component="h2">
                {gameInfo.name}
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
                  {
                    'Total time to complete: ' +
                      gameInfo.questions.reduce((a, b) => a['time-limit'] + b['time-limit'], 0)
                  }
                </Typography>
              </li>
            </ul>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ToggleGameBtn
          gameId={gid}
          sessionId={gameInfo.active}
          active={active}
          setActive={setActive}
        />
        <GameHistory name={gameInfo.name} history={gameInfo.oldSessions} />
        <Button size="medium" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

GameCard.propTypes = {
  gid: PropTypes.number,
  setGames: PropTypes.func,
  games: PropTypes.array,
};

export default GameCard;
