/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
//  import * as OSRS from 'osrs-trade-stats';

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
        <label>Search : </label>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <input type="submit" value="search" />
      </form>
    </div>
  );
};

export default SearchForm;
