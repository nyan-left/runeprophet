/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
//  import * as OSRS from 'osrs-trade-stats';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

// eslint-disable-next-line no-unused-vars
const SearchForm = ({ onSearch } : {onSearch : (text: string) => void}) => {
  const [search, setSearch] = useState('');

  return (
    <div className="App">
      <h1>Search for an item</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(search);
        }}
      >
        <Input placeholder="Abyssal whip" onChange={(e) => setSearch(e.target.value)} inputProps={{ 'aria-label': 'description' }} />
        <Button variant="contained" color="primary" type="submit" value="search">search</Button>
      </form>
    </div>
  );
};

export default SearchForm;
