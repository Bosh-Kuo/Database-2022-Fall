import React, { useContext } from "react";
import { Card } from "antd";
import { HeartTwoTone, ShoppingTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthProvider";
const { Meta } = Card;

const CardProduct = ({ products }) => {
  const navigate = useNavigate();
  const { profile, wishlist, cart, onClickCart, onClickWish } =
    useContext(AuthContext);

  const inWishlist = (name) => {
    return wishlist.some((item) => item.productName === name);
  };
  const inCart = (name) => {
    return cart.some((item) => item.productName === name);
  };

  const navigateToProduct = (id, name) => {
    navigate("/product/" + id, {
      state: {
        productId: id,
        productName: name,
      },
    });
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
                  width: " 300px",
                  height: "300px",
                  objectFit: "contain",
                }}
                alt={product.alt}
                src={"http://127.0.0.1:8000/" + product.image}
                onClick={(e) => navigateToProduct(product.id, product.name)}
              />
            }
            actions={[
              <HeartTwoTone
                key="heart"
                twoToneColor={inWishlist(product.name) ? "red" : "LightGray"}
                onClick={(e) => onClickWish(product.id)}
                style={{
                  pointerEvents:
                    profile.id === product.seller ? "none" : "auto",
                }}
              />,
              <ShoppingTwoTone
                key="cart"
                twoToneColor={inCart(product.name) ? "blue" : "LightGray"}
                onClick={(e) => onClickCart(product.id)}
                style={{
                  pointerEvents:
                    profile.id === product.seller ? "none" : "auto",
                }}
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
