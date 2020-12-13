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
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const handleSearchText = (text: string) => setFilteredItems(fuzzySearch(text));

  const listFromSearchResult = (result : any) => result.map(
    (item : { item : { id : number, name : string}}, i : number) => (
      <li key={i}>
        <Link to={`/item/${item.item.id}`}>
          {item.item.name}
        </Link>
      </li>
    ),
  );

  const ResultsDiv = (
    <div>
      <Router>
        {listFromSearchResult(filteredItems)}
        <Switch>
          <Route path="/item/:id" children={<Item />} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div className="App">
      <SearchForm onSearch={(text) => handleSearchText(text.text)} />
      {ResultsDiv}
    </div>
  );
};

export default SearchResultTable;
