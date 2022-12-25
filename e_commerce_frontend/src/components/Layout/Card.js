import React, { useContext } from "react";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import AuthContext from "../../AuthProvider";
const { Meta } = Card;

const CardProduct = ({ products }) => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
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

  const onClickWish = async (product_id) => {
    console.log(profile.id);
    if (profile.id === undefined) {
      console.log("not a user");
    } else {
      let res = await axios
        .post("/addwishlist/", { user: profile.id, product: product_id })
        .catch(function (error) {
          console.log(error);
        });
      console.log(res.data);
    }
  };

  const onClickCart = async (product_id) => {
    if (profile.id === undefined) {
      console.log("not a user");
    } else {
      let res = await axios
        .post("/addcart/", {
          user: profile.id,
          product: product_id,
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(res.data);
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "70px" }}>
      {products.map((product) => {
        return (
          <Card
            style={{ width: "300px", margin: "10px" }}
            value={product.id}
            key={product.id}
            cover={
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt={product.alt}
                src={"http://127.0.0.1:8000/" + product.image}
                onClick={(e) => navigateToProduct(e, product.id, product.name)}
              />
            }
            actions={[
              <HeartOutlined
                key="heart"
                onClick={(e) => onClickWish(product.id)}
              />,
              <ShoppingCartOutlined
                key="cart"
                onClick={(e) => onClickCart(product.id)}
              />,
            ]}
          >
            <Meta title={product.name} description={product.description} />
          </Card>
        );
      })}
    </div>
  );
};

export default CardProduct;
