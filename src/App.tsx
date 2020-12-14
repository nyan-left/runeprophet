/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import * as OSRS from 'osrs-trade-stats';
import SearchResultTable from './components/search/SearchResultTable';

const App = () => (
  <div className="App">
    <SearchResultTable />
  </div>
);

export default App;
