/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import * as OSRS from 'osrs-trade-stats';
import fuzzySearch from '../../store/search';
import Item from '../item/ItemDetails';
import SearchInputForm from './SearchInputForm';

type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type ItemDetails = Await<ReturnType<typeof OSRS.getFromOfficialAPI>>;

function DataLoader(props : {itemsList : { id: number; name: string; }[]}) : any {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ItemDetails[]>([]);
  const { itemsList } = props;

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      try {
        // eslint-disable-next-line no-return-await
        itemsList.map((itemID) => console.log(itemID));
        const response = await Promise.all(itemsList.map((item) => OSRS.getFromOfficialAPI(item.id)));

        //   await itemIDs.map(OSRS.getFromOfficialAPI);
        !didCancel && setData(response);
      } catch (error) {
        // Do something with error
      } finally {
        !didCancel && setIsLoading(false);
      }
    }
    fetchData();
    return () => { didCancel = true; };
  }, [props.itemsList]);

  if (isLoading) {
    return (
      <tr>
        <td>Loading</td>
        <td>Loading</td>
        <td>Loading</td>
      </tr>
    );
  }
  return (
    data.map((item, i) => (
      <tr key={i}>
        <td>
          <img src={item?.icon} alt={`icon of ${item?.name}`} />
          <Link to={`/item/${item?.id}`}>
            {item?.name}
          </Link>
        </td>
        <td>{item?.current.price}</td>
      </tr>
    ))

  );
}

const SearchResultList = () => {
  const [filteredItems, setFilteredItems] = useState<{ id: number; name: string; }[]>([]);
  const handleSearchText = (text: string) => {
    const searchResult = fuzzySearch(text);
    setFilteredItems(searchResult);
  };

  const ResultsDiv = (
    <div>
      <Router>
        <table>
          <tbody>
            <DataLoader itemsList={filteredItems} />
          </tbody>
        </table>
        <Switch>
          <Route path="/item/:id" children={<Item />} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div className="App">
      <SearchInputForm onSearch={(text) => handleSearchText(text)} />
      {ResultsDiv}
    </div>
  );
};

export default SearchResultList;
