import { Carousel, Descriptions, Tag, Space } from "antd";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "../../axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthProvider";
import Rating from "@mui/material/Rating";

const Product = () => {
  const params = useLocation();
  const [data, setData] = useState([]);
  const [buyerComment, setBuyerComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [value, setValue] = useState([]);
  const productId = params.state.productId;
  const productName = params.state.productName;
  const { profile, cart, wishlist, onClickWish, onClickCart } =
    useContext(AuthContext);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getPid = async () => {
      let res = await axios.get("/products/" + productId);
      console.log(res.data.data);
      setData(res.data.data);
    };

    const getChatRec = async () => {
      let res = await axios.get("/products/comment/" + productId);
      console.log(res.data.data);
      setBuyerComment(res.data.data);
    };
    getPid();
    getChatRec();
    // eslint-disable-next-line
  }, [update]);

  const onClickSendComment = async (product_id, postComment) => {
    if (!profile.id) {
      console.log("please login");
    } else {
      let res = await axios.post("/newComment/", {
        user: profile.id,
        product: product_id,
        comment: postComment,
        rating: value,
      });
      console.log(res.data);
      setUpdate(!update);
      setNewComment("");
    }
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: " flex" }}>
        <div
          style={{
            width: "400px",
            height: "400px",
            backgroundColor: "orange",
            margin: "100px",
            backgroundImage: `url(http://127.0.0.1:8000/${data.image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Carousel autoplay dots={true} dotPosition={"bottom"}>
            <div
              style={{
                backgroundImage: `url(http://127.0.0.1:8000/${data.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </Carousel>
          <div style={{ marginTop: "380px" }}>
            {data.tag?.map((allTag, index) => {
              return (
                <Tag color="magenta" style={{ marginTop: "20px" }} key={index}>
                  {allTag.name}
                </Tag>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ width: "700px", height: "300px", marginTop: "100px" }}>
            <Descriptions title={productName} bordered={true}>
              <Descriptions.Item label="Description" span={3}>
                {data.description}
              </Descriptions.Item>

              <Descriptions.Item label="Price" span={3}>
                {data.price}
              </Descriptions.Item>

              <Descriptions.Item label="Seller">
                {data.sellerName}
              </Descriptions.Item>
            </Descriptions>
            <br></br>
          </div>
          <Space wrap style={{ marginLeft: "450px" }}>
            {wishlist.some((item) => item.productName === productName) ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={(e) => onClickWish(productId)}
              >
                remove from wishlist
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={(e) => onClickWish(productId)}
              >
                add to wishlist
              </Button>
            )}
            {cart.some((item) => item.productName === productName) ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={(e) => onClickCart(productId)}
              >
                remove from cart
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={(e) => onClickCart(productId)}
              >
                add to cart
              </Button>
            )}
          </Space>
        </div>
      </div>

      <div style={{ marginLeft: "80px", marginTop: "100px" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {buyerComment?.map((itemComment, index) => {
            return (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://picsum.photos/200/300" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={itemComment.buyerName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {itemComment.comment}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Rating
                  name="read-only"
                  style={{ marginLeft: "70px" }}
                  value={itemComment.rating}
                  readOnly
                />
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>

        <TextField
          style={{ width: "350px", marginLeft: "65px" }}
          label="Comment"
          variant="standard"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                style={{
                  height: "30px",
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
                variant="contained"
                onClick={(e) => onClickSendComment(productId, newComment)}
              >
                Send
              </Button>
            ),
          }}
        />
      </div>
      <Rating
        style={{ marginLeft: "140px" }}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
};

export default Product;
