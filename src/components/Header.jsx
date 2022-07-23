import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to="/favorites"
        >
          Favorites
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to="/"
        >
          Home
        </NavLink>
        <SearchInput />
      </nav>
    </div>
  );
};

export default Header;
