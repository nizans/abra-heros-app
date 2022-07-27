import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { Loader } from "./Loader";
import "./SearchInput.css";
import useDebounce from "./useDebounce";

const TextHightlighter = ({
  text,
  highlight,
  highlightClassname,
  className,
}) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? highlightClassname
              : className
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};

const HeroSearchItem = ({ heroAutocompleteDetails, searchValue }) => {
  const { name, img } = heroAutocompleteDetails;
  return (
    <div className="hero-search-item">
      <span>
        <img className="hero-avatar" src={img} alt="" />
      </span>
      <TextHightlighter
        text={name}
        highlight={searchValue}
        highlightClassname="highlight"
      />
    </div>
  );
};

const SearchResultPopOver = ({
  data,
  onItemClick,
  show,
  searchValue,
  isLoading,
}) => {
  const handleClick = (id) => {
    if (onItemClick) onItemClick(id);
  };

  return (
    <div
      className="pop-over"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {isLoading && <Loader />}
      {!isLoading && data && data.length === 0 && (
        <div className="no-results-text">Nothing found 😶</div>
      )}
      {data && data.length > 0 && (
        <ul>
          {data.map((hero) => (
            <li key={hero.id} onClick={() => handleClick(hero.id)}>
              <HeroSearchItem
                searchValue={searchValue}
                heroAutocompleteDetails={hero}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const fetchAutocompleteResults = async (q, limit = 10) => {
  const res = await fetch(BASE_URL + `autocomplete?q=${q}&limit=${limit}`);
  if (!res.ok) throw Error("Network error");
  return res.json();
};

const SearchInput = () => {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 3000);
  const [isFocused, setIsFocused] = React.useState(false);
  const client = useQueryClient();

  const result = client.getQueryData(["Autocomplete", search], { exact: true });

  const { data, isLoading } = useQuery(
    ["Autocomplete", result ? search : debouncedSearch],
    () => fetchAutocompleteResults(result ? search : debouncedSearch),
    {
      enabled: !!search,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
  console.log(data);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  

  return (
    <div className="search-input-wrapper">
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
        onChange={handleChange}
        className="search-input"
      />
      <SearchResultPopOver
        isLoading={isLoading}
        data={result || data || []}
        show={!!search && isFocused}
        searchValue={search}
      />
    </div>
  );
};

export default SearchInput;
