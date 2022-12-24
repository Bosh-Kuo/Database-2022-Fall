import React from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("query"));

  return (
    <>
      {`query: ${searchParams.get("query")}`}
      <div style={{ display: "flex", flexWrap: "wrap", margin: "70px" }}></div>
    </>
  );
};
export default Search;
