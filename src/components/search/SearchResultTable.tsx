import React, { useState } from "react";
import fuzzySearch from "../../store/search";
import SearchForm from "./Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


const SearchResultTable = () => {
  const [results, setResults] = useState<any>()
  const listFromSearchResult = (result : any) => result.map((item : any,i : any) => {
    return (
      <li key={i}>
      <Link to ={`/item/${item.item.id}`}>
      {item.item.name}
      </Link>
      </li>
      )
    })
    
    
    const ResultsDiv = (
      <div>
      <Router>
      
      {results}
      <Switch>
      <Route path="/item/:id" children={<Child />} />
      </Switch>
      </Router>
      </div>
      )
      
      function Child() {
        // We can use the `useParams` hook here to access
        // the dynamic pieces of the URL.
        let { id } = useParams<any>();
        
        return (
          <div>
          <h3>ID: {id}</h3>
          </div>
          );
        }
        
        
        return (
          <div className="App">
          <SearchForm onSearch={(text)=> setResults(listFromSearchResult(fuzzySearch(text.text)))} />
          {ResultsDiv}
          </div>
          );
        }
        
        export default SearchResultTable;
        