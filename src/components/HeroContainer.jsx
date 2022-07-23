import React, { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import HeroCard from "./HeroCard";

const LOCAL_STORAGE_FAVS_KEY = "FAVS_IDS";

const HeroContainer = ({ data, search, minHeight, gender, eyeColor }) => {
  const getCM = (str) => parseInt(str.split(" ")[0]);
  const [favorites, setFavorites] = useLocalStorage(LOCAL_STORAGE_FAVS_KEY, []);

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
      filteredData.map((hero) => {
        const isFav = favorites.some((id) => id === hero.id);
        const handleRemoveFav = () =>
          setFavorites((prev) => prev.filter((id) => id !== hero.id));
        const handleAddFav = () => setFavorites((prev) => [...prev, hero.id]);
        const handler = isFav ? handleRemoveFav : handleAddFav;
        return (
          <HeroCard
            isFav={isFav}
            handleFavClick={handler}
            key={hero.id}
            appearance={hero.appearance}
            name={hero.name}
            image={hero.images.lg}
            id={hero.id}
          />
        );
      }),
    [favorites, filteredData, setFavorites]
  );

  return <div className="heros-container">{mappedData}</div>;
};

export default HeroContainer;
