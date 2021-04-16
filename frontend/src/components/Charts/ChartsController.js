import React from 'react';
import PropTypes from 'prop-types';
import ResultBarChart from './ResultBarChart';
import TabBar from '../TabBar';
import { BulletList } from 'react-content-loader';

const ChartsController = ({ players, questions }) => {
  const [view, setView] = React.useState('bar');
  const [labels, setLabels] = React.useState([]);
  const [dataset, setDataset] = React.useState([]);

  console.log(players)
  console.log(questions)

  React.useEffect(() => {
    const labelTmp = [];
    const dataTmp = []
    // set label to data
    questions.map(q => {
      labelTmp.push(q.contents);
      return 1;
    });

    // set value to data (percentage of correctness)
    for (let i = 0; i < questions.length; i++) {
      let correct = 0;
      let total = 0;
      players.map(p => {
        // if the player answered the question
        if (p.answers[i]) {
          total += 1;
          if (p.answers[i].correct) correct += 1;
        }
        return 1; // remove eslint error
      });
      console.log(correct / total)
      dataTmp.push(correct / total);
    }
    setLabels(labelTmp);
    setDataset(dataTmp);
  }, [])
  console.log('dataset', dataset)
  console.log('labels', labels)
  return (
    <div>
      <h2>Charts Overview</h2>
      <TabBar view={view} setView={setView} />
      { labels && dataset
        ? ((view === 'bar' && <ResultBarChart labels={labels} dataset={dataset} />) ||
          (view === 'line' && <p>Line chart</p>) ||
          (view === 'pie' && <p>Pie chart</p>)
          )
        : <BulletList />
      }
    </div>
  );
};

ChartsController.propTypes = {
  players: PropTypes.array,
  questions: PropTypes.array
};

export default ChartsController;
