import { camelCase, startCase } from "lodash";
import React from "react";
import "./HeroCard.css";
import { Loader } from "./Loader";

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
}) => {
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

  return (
    <div className="container">
      <div className="hero-image-container">
        <img className="hero-image" src={image} alt="hero" />;
      </div>
      <div className="hero-info">
        <h3>{name}</h3>
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
