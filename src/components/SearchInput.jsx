import React from "react";
import { useRef } from "react";
import "./SearchInput.css";
const mockResult = [
  {
    name: "A-Bomb",
    id: 1,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
  },
  {
    name: "Abe Sapien",
    id: 2,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/2-abe-sapien.jpg",
  },
  {
    name: "Abin Sur",
    id: 3,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/3-abin-sur.jpg",
  },
  {
    name: "Abomination",
    id: 4,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/4-abomination.jpg",
  },
  {
    name: "Abraxas",
    id: 5,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/5-abraxas.jpg",
  },
  {
    name: "Absorbing Man",
    id: 6,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/6-absorbing-man.jpg",
  },
  {
    name: "Adam Monroe",
    id: 7,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/7-adam-monroe.jpg",
  },
  {
    name: "Adam Strange",
    id: 8,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/8-adam-strange.jpg",
  },
  {
    name: "Agent Bob",
    id: 10,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/10-agent-bob.jpg",
  },
  {
    name: "Agent Zero",
    id: 11,
    img: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/11-agent-zero.jpg",
  },
];

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

const SearchResultPopOver = ({ data, onItemClick, show, searchValue }) => {
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
    </div>
  );
};

const SearchInput = () => {
  const [search, setSearch] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

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
        data={mockResult}
        show={!!search && isFocused}
        searchValue={search}
      />
    </div>
  );
};

export default SearchInput;
