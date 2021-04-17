import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ResultLineChart = ({ labels, dataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Percentage of Correctness',
        borderColor: 'rgb(77, 210, 255)',
        borderWidth: 2,
        fill: false,
        data: dataset
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 1,
          stepSize: 0.2,
          lineHeight: 1.5,
        }
      }],
    },
    layout: {
      padding: 20,
    }
  }

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

ResultLineChart.propTypes = {
  labels: PropTypes.array,
  dataset: PropTypes.array
};

export default ResultLineChart;
