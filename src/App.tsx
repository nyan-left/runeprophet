/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import SearchResultList from './components/search/SearchResultList';
import 'fontsource-roboto';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          marginBottom: '10px',
          padding: '10px',
        }}
      >
        <SearchResultList />
      </div>

    </ThemeProvider>
  </div>
);

export default App;
