import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CardHome from "../Layout/Card";

const Home = () => {
  const [productHome, setProductHome] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [SearchTagValue, setSearchTagValue] = useState([]);
  const [SearchCategoryValue, setSearchCategoryValue] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("products/");
      setProductHome(res.data.data);
    };
    const getTag = async () => {
      const res = await axios.get("tag/");
      setTag(res.data.data);
    };

    const getCat = async () => {
      const res = await axios.get("category/");
      setCategory(res.data.data);
    };

    getProduct();
    getTag();
    getCat();

    // eslint-disable-next-line
  }, []);

  const CategoryTagSearch = async () => {
    console.log("search by", SearchCategoryValue, SearchTagValue);
    let res = await axios.post("/searchByGenres/", {
      category: SearchCategoryValue,
      tag: SearchTagValue,
    });
    let data = res.data.data;
    console.log(res.data.data);
    if (data) {
      setProductHome(data);
      console.log(res.data.data);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={SearchCategoryValue}
          onChange={(event, newValue) => {
            setSearchCategoryValue([...newValue]);
          }}
          options={category}
          getOptionLabel={(option) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          style={{ width: "300px", marginTop: "20px", marginLeft: "30px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search category"
              placeholder="Categories"
            />
          )}
        />
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={SearchTagValue}
          onChange={(event, newValue) => {
            setSearchTagValue([...newValue]);
          }}
          options={tag}
          getOptionLabel={(option) => option.name}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
          style={{ width: "300px", marginTop: "20px", marginLeft: "30px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search tag" placeholder="Tags" />
          )}
        />
        <Button
          style={{
            height: "55px",
            width: "120px",
            marginLeft: "30px",
            marginTop: "20px",
          }}
          variant="contained"
          onClick={CategoryTagSearch}
        >
          Search By
        </Button>
      </div>
      <CardHome products={productHome} />
    </>
  );
};
export default Home;
