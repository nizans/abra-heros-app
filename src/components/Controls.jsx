import React from "react";

const Controls = ({
  gender,
  handleGenderChange,
  search,
  handleSearch,
  minHeight,
  handleHeightChange,
  eyeColors,
  eyeColor,
  handleEyeColorChange,
}) => {
  return (
    <div className="controls">
      <label>
        <select value={gender} onChange={handleGenderChange}>
          <option value="both">Both</option>
          <option value="male">Male</option>
          <option value="female"> Female</option>
        </select>
      </label>
      <label>
        <select value={eyeColor} onChange={handleEyeColorChange}>
          <option value=""></option>
          {eyeColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </label>
      <label>
        Search:{" "}
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Enter hero name"
          type="text"
        />
      </label>
      <label>
        Height in cm:{" "}
        <input
          min={0}
          value={minHeight}
          onChange={handleHeightChange}
          type="number"
        />
      </label>
    </div>
  );
};

export default Controls;
