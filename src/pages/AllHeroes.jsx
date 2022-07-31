import { useInfiniteQuery } from "@tanstack/react-query";
import { entries } from "lodash";
import React, { useState } from "react";
import Controls from "../components/Controls";
import HeroContainer from "../components/HeroContainer";
import { Loader } from "../components/Loader";
import { BASE_URL } from "../utils/constants";

const fetchAllHeroes = async (page) => {
  const res = await fetch(BASE_URL + `all-heroes/?page=${page}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const nextPage = page <= 100 ? page + 1 : undefined;
  const prevPage = page > 0 ? page - 1 : undefined;
  const data = await res.json();
  return { data, nextPage, prevPage, page };
};

const AllHeroes = () => {
  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["all-heros"],
    ({ pageParam = 10 }) => fetchAllHeroes(pageParam),
    {
      staleTime: 3000,
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      getPreviousPageParam: (lastPage) => {
        return lastPage.prevPage;
      },
    }
  );

  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) fetchNextPage();
      });
    })
  );

  const ref = React.useRef(null);

  const [gender, setGender] = useState("both");
  const [search, setSearch] = useState("");
  const [minHeight, setMinHeight] = useState(0);
  const [eyeColor, setEyeColor] = useState();

  React.useEffect(() => {
    const obs = observer.current;
    const el = ref.current;
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, [status]);

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

  if (status === "loading") return <Loader />;
  if (status === "error") return "error";
  if (status === "idle") return "idle";

  let heroes = [];
  for (const page of data.pages) {
    heroes = [...heroes, ...page.data];
  }

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
          eyeColors={[]}
          eyeColor={eyeColor}
          handleEyeColorChange={handleEyeColorChange}
        />
        <button onClick={fetchPreviousPage}>
          {hasPreviousPage ? "Fetch Prev" : "No Prev"}
        </button>
        <HeroContainer
          data={heroes}
          search={search}
          gender={gender}
          minHeight={minHeight}
          eyeColor={eyeColor}
        />
        <button ref={ref} onClick={fetchNextPage}>
          {hasNextPage ? "Fetch More" : "No More"}
        </button>
      </div>
    )
  );
};

export default AllHeroes;
