import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PlayerResultTable from '../Tables/PlayerResultTable';
import Title from '../Titles/Title';
import Subtitle from '../Titles/Subtitle';
import ChartTabBar from '../ChartTabBar';
import { calculateIsoTimeDiff } from '../../TimeManipulation';
import ResultBarChart from '../Charts/ResultBarChart';
import ResultLineChart from '../Charts/ResultLineChart';
import ResultPieChart from '../Charts/ResultPieChart';
import { BulletList } from 'react-content-loader';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 60,
        stepSize: 5,
        lineHeight: 1.5,
        callback: function (value) {
          return value + 's';
        }
      },
    }],
  },
  layout: {
    padding: 20,
  }
}

const getResponseTime = (player) => {
  const timeTmp = [];
  player.answers.map(a => timeTmp.push(calculateIsoTimeDiff(a.questionStartedAt, a.answeredAt)))
  return timeTmp;
}

const getLabels = (questions) => {
  const labelTmp = [];
  // set label to data
  questions.map((q, idx) => {
    labelTmp.push(`${idx + 1}. ${q.contents}`);
    return 1;
  });
  return labelTmp;
}

const PlayerResultModal = ({ player, questions }) => {
  const [open, setOpen] = React.useState(false);
  const [chartView, setChartView] = React.useState('bar');
  const [dataset, setDataset] = React.useState([]);
  const [labels, setLabels] = React.useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Handler for opening the 'create new game' modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler for closing the 'create new game' modal
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setLabels(getLabels(questions));
    setDataset(getResponseTime(player));
  }, [])

  return (
    <div>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
        >
          View Stats
        </Button>
        <Dialog
          open={open}
          maxWidth={'lg'}
          fullWidth
          onClose={handleClose}
          fullScreen={fullScreen}
          aria-labelledby="player-result-title"
        >
            <DialogTitle disableTypography id="player-result-title">
              <Title>
                Results for { player.name }
              </Title>
            </DialogTitle>
                <DialogContent>
                  <PlayerResultTable playerAnswers={player.answers} questions={questions} score={player.score} avgTime={player.averageTime}/>
                  <div>
                    <Subtitle>Charts View for Response Time</Subtitle>
                    <ChartTabBar view={chartView} setView={setChartView} />
                    {
                      labels && dataset
                        ? ((chartView === 'bar' &&
                            <ResultBarChart
                              options={chartOptions}
                              topic='Response Time'
                              labels={labels}
                              dataset={dataset} />) ||
                          (chartView === 'line' &&
                            <ResultLineChart
                              options={chartOptions}
                              topic='Response Time'
                              labels={labels}
                              dataset={dataset} />) ||
                          (chartView === 'pie' &&
                            <ResultPieChart
                              labels={labels}
                              dataset={dataset} />)
                          )
                        : <BulletList />
                    }
                  </div>
                </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
            </DialogActions>
        </Dialog>

    </div>
  );
};

PlayerResultModal.propTypes = {
  player: PropTypes.object,
  questions: PropTypes.array,
};

export default PlayerResultModal;
