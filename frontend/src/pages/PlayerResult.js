import React from 'react';
import makeAPIRequest from '../Api';
import { List } from 'react-content-loader';
import PropTypes from 'prop-types';
import Subtitle from '../components/Titles/Subtitle';

const PlayerResult = ({ playerId }) => {
  // a list of result (1 per question)
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    makeAPIRequest(`play/${playerId}/results`, 'GET', null, null, null)
      .then(res => setResult(res))
      .catch(err => console.log('ERROR: error fetching player result: ', err));
  }, [])

  // XXX: UX content loader
  if (result.length === 0) return <List />

  return (
    <>
      <Subtitle>Well done! View your result below.</Subtitle>
      {
        result.map((r, idx) =>
          <p key={idx}>{JSON.stringify(r)}</p>
        )
      }
    </>
  );
};

PlayerResult.propTypes = {
  playerId: PropTypes.number
}

export default PlayerResult;
