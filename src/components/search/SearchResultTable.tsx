/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import fuzzySearch from '../../store/search';
import Item from '../item/ItemDetails';
import SearchForm from './Form';

const SearchResultTable = () => {
  const [results, setResults] = useState<any>();
  const listFromSearchResult = (result : any) => result.map((item : any, i : any) => (
    <li key={i}>
      <Link to={`/item/${item.item.id}`}>
        {item.item.name}
      </Link>
    </li>
  ));

  const ResultsDiv = (
    <div>
      <Router>
        {results}
        <Switch>
          <Route path="/item/:id" children={<Item />} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div className="App">
      <SearchForm onSearch={(text) => setResults(listFromSearchResult(fuzzySearch(text.text)))} />
      {ResultsDiv}
    </div>
  );
};

export default SearchResultTable;
