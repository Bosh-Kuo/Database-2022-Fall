import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const HeaderMenu = ({ anchorElUser, handleCloseUserMenu }) => {
  // * logout 沒有對應的頁面
  const items = ["user", "cart", "wishlist", "login", "logout", "register"];
  const navigate = useNavigate();
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
