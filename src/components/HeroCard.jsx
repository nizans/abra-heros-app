import { camelCase, startCase } from "lodash";
import React from "react";
import "./HeroCard.css";

const HeroCard = ({ image, name, appearance, id, isFav, handleFavClick }) => {
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
      </div>
      <button onClick={handleFavClick}>{isFav ? "Remove" : "Add"}</button>
    </div>
  );
};

export default HeroCard;
