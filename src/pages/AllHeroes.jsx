import React, { useState } from "react";
import Controls from "../components/Controls";
import HeroContainer from "../components/HeroContainer";
import { BASE_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";

const fetchAllHeroes = async () => {
  const res = await fetch(BASE_URL + "all-heroes");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

const AllHeroes = () => {
  const { data, status } = useQuery(["ALL_HEROES"], fetchAllHeroes, {
    staleTime: Infinity,
  });
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

  if (status === "loading") return <Loader />;
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
