import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const ResultBarChar = ({ options, topic, labels, dataset }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: topic,
        backgroundColor: 'rgba(77, 210, 255,0.5)',
        borderColor: 'rgba(77, 210, 255,0.2)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 190, 255,0.6)',
        hoverBorderColor: 'rgba(0, 171, 230,1)',
        data: dataset
      }
    ]
  };

  return (
    <Bar
      data={data}
      options={options}
    />
  );
};

ResultBarChar.propTypes = {
  options: PropTypes.object,
  topic: PropTypes.string,
  labels: PropTypes.array,
  dataset: PropTypes.array
};

export default ResultBarChar;
