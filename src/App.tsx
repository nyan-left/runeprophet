/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import * as OSRS from 'osrs-trade-stats';
import SearchResultList from './components/search/SearchResultList';

const App = () => (
  <div className="App">
    <SearchResultList />
  </div>
);

export default App;
