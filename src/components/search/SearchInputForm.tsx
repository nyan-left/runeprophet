/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
//  import * as OSRS from 'osrs-trade-stats';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper/Paper';

// eslint-disable-next-line no-unused-vars
const SearchInputForm = ({ onSearch } : {onSearch : (text: string) => void}) => {
  const [search, setSearch] = useState('');

  return (
    <Paper
      elevation={1}
      style={{
        marginBottom: '20px',
        marginTop: '5%',
        marginLeft: '30%',
        marginRight: '30%',
      }}
    >
      <div className="App">
        <Typography variant="h6" component="h2" gutterBottom>
          Search for an item
        </Typography>
        <form
          onSubmit={(e) => {
            const itemPage = document.getElementById('itemPage') || document.createElement('div');
            itemPage.style.display = 'none';
            const resultsTable = document.getElementById('searchResultsTable') || document.createElement('div');
            resultsTable.style.display = 'inline';
            e.preventDefault();
            onSearch(search);
          }}
        >
          <Input style={{ marginBottom: '20px', marginRight: '15px' }} placeholder="Abyssal whip" onChange={(e) => setSearch(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
          <Button variant="contained" color="secondary" type="submit" value="search">search</Button>
        </form>
      </div>
    </Paper>
  );
};

export default SearchInputForm;
