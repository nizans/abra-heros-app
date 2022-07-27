import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";

const postToggleDarkMode = async (dark) => {
  console.log(dark);
  const body = { isDarkMode: dark };
  const res = await fetch(BASE_URL + "toggle-dark-mode", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.body();
};

const Header = () => {
  const { mutate } = useMutation({
    mutationFn: postToggleDarkMode,
  });

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
        <button onClick={() => mutate(true)}>toggle dark mode</button>
      </nav>
    </div>
  );
};

export default Header;
