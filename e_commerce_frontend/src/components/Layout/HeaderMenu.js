import React, { useEffect, useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthProvider";
import axios from "../../axios";

const HeaderMenu = ({ anchorElUser, handleCloseUserMenu }) => {
  // * logout 沒有對應的頁面，並且要另外寫 onclick
  const [items, setItems] = useState([]);
  const { auth, setAuth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      setItems(["user", "cart", "wishlist", "logout"]);
    } else {
      setItems(["login", "register"]);
    }
  }, [auth]);

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {items.map((item) => (
        <MenuItem key={item} onClick={handleCloseUserMenu}>
          <Typography
            textAlign="center"
            sx={{ textTransform: "uppercase" }}
            onClick={() => {
              if (item === "logout") {
                axios.post(
                  "logout/",
                  {},
                  {
                    headers: {
                      Authorization: `Token ${token}`,
                    },
                  }
                );
                setAuth(false);
              }
              navigate(`/${item}`);
            }}
          >
            {item}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default HeaderMenu;
