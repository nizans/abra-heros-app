import { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import "./App.css";

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

  const handleGenderChange = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (status === "loading") return "loading";
  if (status === "error") return "error";

  return (
    status === "success" && (
      <div className="app">
        <div className="controls">
          <label>
            <select value={gender} onChange={handleGenderChange}>
              <option value="both">Both</option>
              <option value="male">Male</option>
              <option value="female"> Female</option>
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
        </div>

        <div className="heros-container">
          {data
            .filter((hero) =>
              hero.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((hero) => (
              <HeroCard
                key={hero.id}
                appearance={hero.appearance}
                name={hero.name}
                image={hero.images.lg}
                id={hero.id}
              />
            ))}
        </div>
      </div>
    )
  );
}

export default App;
