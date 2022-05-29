import React, { useMemo } from "react";
import HeroCard from "./HeroCard";

const HeroContainer = ({ data, search, minHeight, gender, eyeColor }) => {
  const getCM = (str) => parseInt(str.split(" ")[0]);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (minHeight > 0)
      filtered = filtered.filter(
        (hero) => getCM(hero.appearance.height) >= minHeight
      );

    if (gender !== "both") {
      filtered = filtered.filter((hero) => {
        return hero.appearance.gender.toLowerCase() === gender;
      });
    }

    if (eyeColor) {
      filtered = filtered.filter((hero) => {
        return hero.appearance.eyeColor === eyeColor;
      });
    }

    if (search)
      filtered = filtered.filter((hero) =>
        hero.name.toLowerCase().includes(search.toLowerCase())
      );

    return filtered;
  }, [data, eyeColor, gender, minHeight, search]);

  const mappedData = useMemo(
    () =>
      filteredData.map((hero) => (
        <HeroCard
          key={hero.id}
          appearance={hero.appearance}
          name={hero.name}
          image={hero.images.lg}
          id={hero.id}
        />
      )),
    [filteredData]
  );

  return <div className="heros-container">{mappedData}</div>;
};

export default HeroContainer;
