import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import randomColor from 'randomcolor';

const ResultPieChart = ({ labels, dataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: [],
      }
    ]
  };

  for (let i = 0; i < dataset.length; i++) {
    data.datasets[0].backgroundColor.push(randomColor());
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    }
  }

  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
};

ResultPieChart.propTypes = {
  labels: PropTypes.array,
  dataset: PropTypes.array
};

export default ResultPieChart;
