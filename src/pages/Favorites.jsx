import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { BASE_URL, LOCAL_STORAGE_FAVS_KEY } from "../utils/constants";
import { useQueries } from "@tanstack/react-query";
import HeroCard from "../components/HeroCard";
const fetchHero = async (id) => {
  const res = await fetch(BASE_URL + "hero/" + id);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Favorites = () => {
  const [favorites, setFavorites] = useLocalStorage(LOCAL_STORAGE_FAVS_KEY, []);
  const userQueries = useQueries({
    queries: favorites.map((id) => {
      return {
        queryKey: ["favorite", id],
        queryFn: () => fetchHero(id),
      };
    }),
  });

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((_id) => _id !== id));
  };

  return (
    <div className="heros-container">
      {userQueries.map(
        ({ data, isLoading, isError, fetchStatus, refetch }, i) => {
          return (
            <HeroCard
              key={i}
              isFav
              handleFavClick={() => handleRemoveFavorite(data.id)}
              appearance={data?.appearance}
              name={data?.name}
              image={data?.images.lg}
              status={data?.status}
              health={data?.health}
              id={data?.id}
              isLoading={isLoading}
              error={isError}
              fetchStatus={fetchStatus}
              refetch={refetch}
            />
          );
        }
      )}
    </div>
  );
};

export default Favorites;
