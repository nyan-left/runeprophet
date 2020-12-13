import React, { useState } from "react";

const SearchForm = ({ onSearch } : {onSearch : (text: Readonly<{ text: string; }>) => void} ) => {
  const [query, setQuery] = useState({ text: "" });

  function handleChange(event: { preventDefault: () => void; target: { value: any; }; }) {
    event.preventDefault();
    const newQuery = Object.freeze({ text: event.target.value });
    setQuery(newQuery);
  }

  function search(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const newQuery = Object.freeze({ text: query.text });
    if (onSearch) onSearch(newQuery);
  }

  return (
    <form>
      <input type="text" onChange={handleChange} />
      <button onClick={search} type="button">
        Search
      </button>
    </form>
  );
}
export default SearchForm
