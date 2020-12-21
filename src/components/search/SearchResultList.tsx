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
import Item from '../item/item';
import SearchInputForm from './SearchInputForm';
import useStore from '../../store/store';
// const store = {
//   graph: useStore.showGraph((state) => state),
//   searchResult: useStore.showSearch((state) => state),
// };
type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
} ? U : T;

type ItemDetails = Await<ReturnType<typeof OSRS.getFromOsrsBox>>;

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

function DataLoader(props : {itemsList : { id: number; name: string; }[]}) : any {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ItemDetails[]>([]);
  const { itemsList } = props;
  const store = {
    graph: useStore.showGraph((state) => state),
    searchResult: useStore.showSearch((state) => state),
  };
  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setIsLoading(true);
      try {
        // eslint-disable-next-line no-return-await
        itemsList.map((itemID) => console.log(itemID));
        const response = await Promise.all(itemsList.map((item) => OSRS.getFromOsrsBox(item.id, '')));

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
        <td style={{ textAlign: 'center' }}>Loading...</td>
      </tr>
    );
  }
  return (
    data.map((item, i) => (
      <TableRow key={item?.name}>
        <TableCell align="right"><img src={`data:image/jpeg;base64,${item?.icon}`} alt={`icon of ${item?.name}`} /></TableCell>
        <TableCell>
          <Link
            style={{ color: '#FFF' }}
            onClick={() => {
            // not reacty at all. TODO - Solve via props/conditional rendering
              // const resultsTable = document.getElementById('searchResultsTable') || document.createElement('div');
              // resultsTable.style.display = 'none';
              store.searchResult.set(false);
              store.graph.set(true);
              // const itemPage = document.getElementById('itemPage') || document.createElement('div');
              // itemPage.style.display = 'inline';
            }}
            to={`/item/${item?.id}`}
          >
            {item?.name}
          </Link>
        </TableCell>
        <TableCell align="left">{item?.buy_limit}</TableCell>
      </TableRow>
    ))
  );
}

const SearchResultList = () => {
  const [filteredItems, setFilteredItems] = useState<{ id: number; name: string; }[]>([]);
  const handleSearchText = (text: string) => {
    const searchResult = fuzzySearch(text);
    setFilteredItems(searchResult);
  };
  const classes = useStyles();

  const store = {
    graph: useStore.showGraph((state) => state),
    searchResult: useStore.showSearch((state) => state),
  };

  const searchResults = (
    <TableContainer id="searchResultsTable" component={Paper} style={{ display: 'inline' }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Trade Limit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ width: '100%' }}>
          <DataLoader itemsList={filteredItems} />
        </TableBody>
      </Table>
    </TableContainer>
  );
  const ResultsDiv = (
    <div>
      <Router>
        {store.searchResult.showSearch ? searchResults : null}
        <Switch>
          <Route path="/item/:id" children={<Item />} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div className="App">
      <SearchInputForm onSearch={(text) => handleSearchText(text)} />
      <Paper elevation={15} style={{ marginLeft: '5%', marginRight: '5%' }}>
        {ResultsDiv}
      </Paper>
    </div>
  );
};

export default SearchResultList;
