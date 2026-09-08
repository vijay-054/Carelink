import React, {
  useState,
} from "react";

const SearchFilterBar = ({
  placeholder = "Search...",
  filterOptions = [],
  onSearch,
  onFilter,
}) => {

  const [search, setSearch] =
    useState("");

  const handleSearch = (event) => {

    const value =
      event.target.value;

    setSearch(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="search-filter-bar">

      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearch}
      />

      {filterOptions.length > 0 && (
        <select
          defaultValue="ALL"
          onChange={(event) =>
            onFilter &&
            onFilter(event.target.value)
          }
        >

          {filterOptions.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}

        </select>
      )}

    </div>
  );
};

export default SearchFilterBar;