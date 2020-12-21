/* eslint-disable max-len */
/* eslint-disable padded-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
//  import * as OSRS from 'osrs-trade-stats';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import useStore from '../../store/store';
// eslint-disable-next-line no-unused-vars
const SearchInputForm = ({ onSearch } : {onSearch : (text: string) => void}) => {
  const [search, setSearch] = useState('');
  const store = {
    graph: useStore.showGraph((state) => state),
    searchResult: useStore.showSearch((state) => state),
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Paper
        elevation={1}
        style={{
          marginBottom: '20px',
          maxWidth: '400px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <div className="App">
          <Typography variant="h6" component="h2" gutterBottom>
            Search for an item
          </Typography>
          <form
            onSubmit={(e) => {

              // const itemPage = document.getElementById('itemPage') || document.createElement('div');
              // itemPage.style.display = 'none';
              store.graph.set(false);
              store.searchResult.set(true);

              // const resultsTable = document.getElementById('searchResultsTable') || document.createElement('div');
              // resultsTable.style.display = 'inline';

              e.preventDefault();
              onSearch(search);
            }}
          >
            <Input style={{ marginBottom: '20px', marginRight: '15px' }} placeholder="Abyssal whip" onChange={(e) => setSearch(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
            <Button variant="contained" style={{ backgroundColor: 'orange' }} type="submit" value="search">search</Button>
          </form>
        </div>
      </Paper>
    </Grid>
  );
};

export default SearchInputForm;
