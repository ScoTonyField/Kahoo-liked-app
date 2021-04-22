import { TableCell, Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import React from 'react';
import Row from './Row';

describe('Row', () => {
  let row;
  beforeEach(() => {
    const props = {
      row: {
        qid: '12345',
        isSingle: true,
        contents: 'Hello',
        timeLimit: 10,
        points: 25,
        media: '',
        options: ['options1', 'options2'],
        answers: [0]
      }
    };
    row = shallow(<Row {...props} />);
  });

  // check snapshot
  it('snapshot', () => {
    expect(row).toMatchSnapshot();
  });

  // checked qid is correct
  it('checked qid', () => {
    expect(row.find(TableCell).at(1).text()).toEqual('12345');
  });

  // checked Question and option content is correct
  it('initial close', () => {
    expect(row.find(Typography).at(0).text()).toEqual('Questions:Hello Options: options1options2');
  });
})
