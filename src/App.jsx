import { useMemo, useState } from "react";
import "./App.css";
import Controls from "./components/Controls";
import HeroContainer from "./components/HeroContainer";
import useFetchData, { StatusState } from "./hooks/useFetchData";

const BASE_URL = "https://abra-training.herokuapp.com/api/all-heros";

function App() {
  const { data, status } = useFetchData(BASE_URL);
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

  const eyeColors = useMemo(
    () =>
      data ? [...new Set(data.map((hero) => hero.appearance.eyeColor))] : [],
    [data]
  );

  if (status === StatusState.loading) return StatusState.loading;
  if (status === StatusState.error) return StatusState.error;
  if (status === StatusState.idle) return StatusState.idle;

  return (
    status === StatusState.success && (
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
}

export default App;
