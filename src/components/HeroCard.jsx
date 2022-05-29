import { camelCase, startCase } from 'lodash';
import React, { useState } from 'react';
import './HeroCard.css';

const HeroCard = ({ image, name, appearance, id }) => {
  const [isFav, setIsFav] = useState(Boolean(localStorage.getItem(id)));

  const handleSaveToFavorites = () => {
    if (isFav) {
      localStorage.removeItem(id);
      setIsFav(false);
    } else {
      localStorage.setItem(id, true);
      setIsFav(true);
    }
  };

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
      <button onClick={handleSaveToFavorites}>
        {isFav ? 'Remove' : 'Add'}
      </button>
    </div>
  );
};

export default HeroCard;
