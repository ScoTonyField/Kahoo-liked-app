import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: [],
  datasets: [
    {
      label: 'Percentage of Correctness',
      backgroundColor: 'rgba(77, 210, 255,0.5)',
      borderColor: 'rgba(77, 210, 255,0.2)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0, 190, 255,0.6)',
      hoverBorderColor: 'rgba(0, 171, 230,1)',
      data: []
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
        fontSize: 14,
      }
    }],
    // xAxes: [{
    //   gridLines: {
    //     zeroLineWidth: 1
    //   }
    // }]
  }
}

const ResultBarChar = ({ players, questions }) => {
  console.log(players)
  console.log(questions)

  // set label to data
  questions.map(q => {
    data.labels.push(q.contents);
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
    data.datasets[0].data.push(correct / total);
  }
  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <Bar
        data={data}
        height={100}
        options={options}
      />
      </div>
  );
};

ResultBarChar.propTypes = {
  players: PropTypes.array,
  questions: PropTypes.array
};

export default ResultBarChar;
