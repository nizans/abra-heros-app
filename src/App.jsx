import { useEffect, useState } from "react";
import "./App.css";
import Controls from "./components/Controls";
import HeroContainer from "./components/HeroContainer";

const BASE_URL = "https://abra-training.herokuapp.com/api/all-heros";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };
    fetchData();
  }, [url]);
  return { data, status };
};

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

  if (status === "loading") return "loading";
  if (status === "error") return "error";
  if (status === "idle") return "idle";
  const eyeColors = [...new Set(data.map((hero) => hero.appearance.eyeColor))];

  return (
    status === "success" && (
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
