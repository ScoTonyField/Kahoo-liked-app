import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';

const TabBar = ({ view, setView }) => {
  const handleChange = (e, newValue) => {
    setView(newValue);
  };

  return (
    <AppBar position="static">
      <Tabs
        value={view}
        onChange={handleChange}
        centered
        aria-label="chart view change tabs"
      >
        <Tab value='bar' label="Bar Chart" />
        <Tab value='line' label="Line Chart" />
        <Tab value='pie' label="Pie Chart" />
      </Tabs>

    </AppBar>
  );
}

TabBar.propTypes = {
  setView: PropTypes.func,
  view: PropTypes.string,
};

export default TabBar;
