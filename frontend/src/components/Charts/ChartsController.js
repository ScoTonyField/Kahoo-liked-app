import React from 'react';
import PropTypes from 'prop-types';
import ResultBarChart from './ResultBarChart';
import ResultLineChart from './ResultLineChart';
import ResultPieChart from './ResultPieChart';
import ChartTabBar from '../ChartTabBar';
import { BulletList } from 'react-content-loader';
import { Box, FormHelperText, MenuItem, Select } from '@material-ui/core';

const calculateCorrectness = (players, questions) => {
  const dataTmp = [];
  for (let i = 0; i < questions.length; i++) {
    let correct = 0;
    let numAnswer = 0;
    players.map(p => {
      // if the player answered the question
      if (p.answers[i]) {
        numAnswer += 1;
        if (p.answers[i].correct) correct += 1;
      }
      return 1; // remove eslint error
    });
    const percentage = correct / numAnswer;
    dataTmp.push(isNaN(percentage) ? 0 : percentage);
  }
  return dataTmp;
}

const calculateAvgResponseTime = (players, questions) => {
  const dataTmp = [];
  for (let i = 0; i < questions.length; i++) {
    let totalResponseTime = 0;
    let numAnswer = 0;
    players.map(p => {
      // if the player answered the question
      if (p.answers[i]) {
        const start = p.answers[i].questionStartedAt;
        const answer = p.answers[i].answeredAt;
        if (start != null && answer != null) {
          numAnswer += 1;
          const startDateObj = new Date(start);
          const answerDateObj = new Date(answer);
          const diff = answerDateObj - startDateObj;
          totalResponseTime += isNaN(diff) ? 0 : diff / 1000;
        }
      }
      return 1; // remove eslint error
    });
    dataTmp.push(totalResponseTime ? (totalResponseTime / numAnswer) : 0);
  }
  return dataTmp;
}

const ChartsController = ({ players, questions }) => {
  const [view, setView] = React.useState('bar');
  const [topic, setTopic] = React.useState('Percentage of Correctness');
  const [labels, setLabels] = React.useState([]);
  const [dataset, setDataset] = React.useState([]);

  console.log('players: ', players)
  console.log('questions: ', questions)
  console.log('topic: ', topic);

  React.useEffect(() => {
    const labelTmp = [];
    // set label to data
    questions.map(q => {
      labelTmp.push(q.contents);
      return 1;
    });
    setLabels(labelTmp);

    // set value to data according to data topic
    if (topic === 'Percentage of Correctness') {
      setDataset(calculateCorrectness(players, questions));
    } else if (topic === 'Average Response Time') {
      setDataset(calculateAvgResponseTime(players, questions));
    }
  }, [topic])

  const handleChange = (e) => setTopic(e.target.value);

  console.log('dataset: ', dataset);

  return (
    <div>
      <h2>Charts</h2>
      {
        (questions.length === 0 || players.length === 0)
          ? <p align="center">Charts not available: No player or no question</p>
          : (
              <>
                <Box m={2}>
                  <Select
                    value={topic}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value='Percentage of Correctness'>Percentage of Correctness</MenuItem>
                    <MenuItem value='Average Response Time'>Average Response Time</MenuItem>
                  </Select>
                  <FormHelperText>Please select your Data Topic</FormHelperText>
                </Box>
                <ChartTabBar view={view} setView={setView} />
                <h3 align="center" >{topic}</h3>
                { labels && dataset
                  ? ((view === 'bar' && <ResultBarChart labels={labels} dataset={dataset} />) ||
                    (view === 'line' && <ResultLineChart labels={labels} dataset={dataset} />) ||
                    (view === 'pie' && <ResultPieChart labels={labels} dataset={dataset} />)
                    )
                  : <BulletList />
                }
              </>
            )
      }
    </div>
  );
};

ChartsController.propTypes = {
  players: PropTypes.array,
  questions: PropTypes.array
};

export default ChartsController;
