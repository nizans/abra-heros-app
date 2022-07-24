import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import Controls from "../components/Controls";
import HeroContainer from "../components/HeroContainer";

const fetchAll = async (queryContext) => {
  const res = await fetch(BASE_URL + "all-heroes");
  const data = await res.json();
  return data;
};

const AllHeroes = () => {
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ["all-heroes"],
    fetchAll,
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  const [gender, setGender] = useState("both");
  const [search, setSearch] = useState("");
  const [minHeight, setMinHeight] = useState(0);
  const [eyeColor, setEyeColor] = useState();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleHeightChange = (e) => {
    if (e.target.value < 0) return;
    setMinHeight(e.target.value);
  };

  const handleEyeColorChange = (e) => {
    setEyeColor(e.target.value);
  };

  if (isLoading) return "loading";
  if (isError) return error.message;

  const eyeColors = [...new Set(data.map((hero) => hero.appearance.eyeColor))];

  return (
    isSuccess && (
      <div className="app">
        <Controls
          gender={gender}
          handleGenderChange={handleGenderChange}
          search={search}
          handleSearch={handleSearch}
          minHeight={minHeight}
          handleHeightChange={handleHeightChange}
          eyeColors={eyeColors}
          eyeColor={eyeColor}
          handleEyeColorChange={handleEyeColorChange}
        />
        <HeroContainer
          data={data}
          search={search}
          gender={gender}
          minHeight={minHeight}
          eyeColor={eyeColor}
        />
      </div>
    )
  );
};

export default AllHeroes;
