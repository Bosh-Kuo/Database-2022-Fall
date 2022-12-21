import React, { useState, useEffect } from "react";
import { Select, Space, Avatar, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "../../axios";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const { Meta } = Card;
const Home = () => {
  const [productHome, setproductHome] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [SearchTagValue, setSearchTagValue] = useState([]);
  const [SearchCategoryValue, setSearchCategoryValue] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("products/").then((res) => {
      console.log(res.data.data);
      setproductHome(res.data.data);
    });
    axios.get("tag/").then((res) => {
      setTag(res.data.data);
    });

    axios.get("category/").then((res) => {
      setCategory(res.data.data);
    });
  }, []);

  const navigateToProduct = (e, id, name) => {
    // 👇️ navigate to /contacts
    console.log(name);
    navigate("/product/" + id, {
      state: {
        productId: id,
        productName: name,
      },
    });
  };

  const CategoryTagSearch = () => {
    console.log("search by", SearchCategoryValue, SearchTagValue);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* <Select
          mode="multiple"
          style={{ width: "10%", marginTop: "20px", marginLeft: "30px" }}
          options={category.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
        /> */}
        {/* <Select
          mode="multiple"
          style={{ width: "10%", marginTop: "20px", marginLeft: "30px" }}
          options={tag.map((item) => ({
            value: item.name,
            label: item.name,
          }))}
        /> */}
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
      <div style={{ display: "flex", flexWrap: "wrap", margin: "70px" }}>
        {productHome.map((product) => {
          return (
            <Card
              style={{ width: "300px", margin: "10px" }}
              value={product.id}
              key={product.id}
              cover={
                <img
                  style={{
                    width: " 300px",
                    height: "200px",
                    objectFit: " cover",
                  }}
                  alt={product.alt}
                  src={"http://127.0.0.1:8000/" + product.image}
                  onClick={(e) =>
                    navigateToProduct(e, product.id, product.name)
                  }
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
              ]}
            >
              <Meta
                title={product.name}
                description={"$" + product.description}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default Home;
