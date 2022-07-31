import { useMutation, useQueryClient } from "@tanstack/react-query";
import { camelCase, startCase } from "lodash";
import React from "react";
import { BASE_URL } from "../utils/constants";
import "./HeroCard.css";
import { Loader } from "./Loader";

const deleteHero = async (id) => {
  const res = await fetch(BASE_URL + "hero/" + id, {
    method: "DELETE",
  });
  if (!res.ok) throw Error("requst failed");
  return await res.json();
};

const HeroCard = ({
  image,
  name,
  appearance,
  isFav,
  handleFavClick,
  status,
  health,
  isLoading,
  error,
  fetchStatus,
  refetch,
  id,
}) => {
  const client = useQueryClient();
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: deleteHero,
    mutationKey: ["DELETE", id],
    onMutate: () => {
      const heroToDelete = client
        .getQueryData(["ALL_HEROES"])
        .find((hero) => hero.id);
      client.setQueryData(["ALL_HEROES"], (prev) =>
        prev.filter((hero) => hero.id !== id)
      );
      return { heroToDelete };
    },
    onError: (error, varibales, context) => {
      const { heroToDelete } = context;
      client.setQueryData(["ALL_HEROES"], (prev) => [heroToDelete, ...prev]);
    },
    onSettled: () => {},
  });

  if (isLoading)
    return (
      <div className="container">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="container">Oops somthing went wrong, cant get data</div>
    );

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <div className="container">
      <div className="hero-image-container">
        <img className="hero-image" src={image} alt="hero" />;
      </div>
      <div className="hero-info">
        <h3>{name}</h3>
        <span>{id}</span>
        {Object.entries(appearance).map((keyVal, i) => {
          return (
            <div key={i}>
              <span>
                <strong>{startCase(camelCase(keyVal[0]))}: </strong>
              </span>
              <span>{startCase(camelCase(keyVal[1]))}</span>
            </div>
          );
        })}
        {status && (
          <div>
            <span>
              <strong>Status: </strong>
            </span>
            <span>{status}</span>
          </div>
        )}
        {health && (
          <div>
            <span>
              <strong>Health: </strong>
            </span>
            <span>{health}</span>
          </div>
        )}
      </div>
      <div>
        <button onClick={handleFavClick}>{isFav ? "Remove" : "Add"}</button>
        {refetch && <button onClick={refetch}>Refresh</button>}
        <button disabled={isMutating} onClick={handleDelete}>
          {"DELETE FROM SERVER"}
        </button>
      </div>
      {fetchStatus && (
        <span className="fetch-status">
          <div
            style={{
              backgroundColor: fetchStatus === "fetching" ? "orange" : "green",
            }}
            className="dot"
          />
        </span>
      )}
    </div>
  );
};

export default HeroCard;
