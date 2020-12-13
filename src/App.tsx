/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import * as OSRS from 'osrs-trade-stats';
import SearchResultTable from './components/search/SearchResultTable';

OSRS.getFrom2007HQ(4151);
// const test = async () => {

// };
// test();

const App = () => (
  <div className="App">
    <SearchResultTable />
  </div>
);

export default App;
