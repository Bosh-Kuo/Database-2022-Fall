import { createContext, useState, useEffect } from "react";
import axios from "./axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [operation, setOperation] = useState(0);

  const getWishList = async () => {
    if (profile.id) {
      const res = await axios.get("wishlist/" + profile.id);
      setWishlist(res.data.data);
    }
  };

  const getCart = async () => {
    if (profile.id) {
      const res = await axios.get("cart/" + profile.id);
      setCart(res.data.data);
    }
  };

  const onClickWish = async (productId) => {
    if (!profile.id) {
      console.log("please login");
    } else {
      try {
        await axios.post("/updateWishlist/", {
          user: profile.id,
          product: productId,
        });
        setOperation(operation + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onClickCart = async (productId) => {
    if (!profile.id) {
      console.log("please login");
    } else {
      try {
        await axios.post("/updateCart/", {
          user: profile.id,
          product: productId,
        });
        setOperation(operation + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onClickBuy = async (productId, sellerId) => {
    try {
      await axios.post("/transaction/", {
        buyer: profile.id,
        seller: sellerId,
        product: productId,
      });
      setOperation(operation + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth === false || !token) {
      setAuth(false);
      setToken("");
      setProfile({});
      setWishlist([]);
      setCart([]);
    }
    getWishList();
    getCart();
    // eslint-disable-next-line
  }, [auth, token, operation]);

  const value = {
    auth,
    setAuth,
    token,
    setToken,
    profile,
    setProfile,
    wishlist,
    setWishlist,
    cart,
    setCart,
    getWishList,
    getCart,
    onClickWish,
    onClickCart,
    onClickBuy,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
