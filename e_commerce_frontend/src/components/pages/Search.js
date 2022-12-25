import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography } from "antd";
import CardSearch from "../Layout/Card";
import axios from "../../axios";

const Search = () => {
  const { Title } = Typography;
  const [searchParams] = useSearchParams();
  const [productSearch, setProductSearch] = useState([]);

  useEffect(() => {
    const searchProduct = async () => {
      const res = await axios.post("/search/", {
        query: searchParams.get("query"),
      });
      setProductSearch(res.data.products);
    };
    searchProduct(productSearch);
    // eslint-disable-next-line
  }, [searchParams]);
  console.log(productSearch);

  return (
    <>
      <Title
        type="secondary"
        level={2}
        style={{ textAlign: "center" }}
      >{`query: ${searchParams.get("query")}`}</Title>
      <CardSearch products={productSearch}></CardSearch>
    </>
  );
};
export default Search;
