import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ResultLineChart = ({ options, topic, labels, dataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: topic,
        borderColor: 'rgb(77, 210, 255)',
        borderWidth: 2,
        fill: false,
        data: dataset
      }
    ]
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

ResultLineChart.propTypes = {
  options: PropTypes.object,
  topic: PropTypes.string,
  labels: PropTypes.array,
  dataset: PropTypes.array,
};

export default ResultLineChart;
