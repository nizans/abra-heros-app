import React, { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import Controls from "../components/Controls";
import HeroContainer from "../components/HeroContainer";
import { BASE_URL } from "../App";

const AllHeroes = () => {
  const { data, status } = useFetchData(BASE_URL + "all-heros");
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

  if (status === "loading") return "loading";
  if (status === "error") return "error";
  if (status === "idle") return "idle";
  const eyeColors = [...new Set(data.map((hero) => hero.appearance.eyeColor))];

  return (
    status === "success" && (
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
