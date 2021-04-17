import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const ResultBarChar = ({ labels, dataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Percentage of Correctness',
        backgroundColor: 'rgba(77, 210, 255,0.5)',
        borderColor: 'rgba(77, 210, 255,0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 190, 255,0.6)',
        hoverBorderColor: 'rgba(0, 171, 230,1)',
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
    <Bar
      data={data}
      options={options}
    />
  );
};

ResultBarChar.propTypes = {
  labels: PropTypes.array,
  dataset: PropTypes.array
};

export default ResultBarChar;
