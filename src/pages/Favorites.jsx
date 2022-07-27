import { useQueries } from "@tanstack/react-query";
import React from "react";
import HeroCard from "../components/HeroCard";
import useLocalStorage from "../hooks/useLocalStorage";
import { BASE_URL, LOCAL_STORAGE_FAVS_KEY } from "../utils/constants";

const fetchHero = async (id) => {
  const res = await fetch(BASE_URL + "hero/" + id);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

// [1,2,3,4,5,6,7,8]
// queryKey: ["favorite", id],
// queryFn: () => fetchHero(id),
// refetchInterval: parseInt(id) % 3 === 0 ? 3000 : 0,

const Favorites = () => {
  const [favorites, setFavorites] = useLocalStorage(LOCAL_STORAGE_FAVS_KEY, []);

  const favoritesQueries = useQueries({
    queries: favorites.map((id) => ({
      queryKey: ["favorite", id],
      queryFn: () => fetchHero(id),
      refetchInterval: parseInt(id) % 3 === 0 ? 3000 : 0,
    })),
  });

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((_id) => _id !== id));
  };

  return (
    <div className="heros-container">
      {favoritesQueries.map(
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
