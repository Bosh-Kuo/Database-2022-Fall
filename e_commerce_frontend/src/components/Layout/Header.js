import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SeachBar";
import HeaderMenu from "./HeaderMenu";
import HeaderTitle from "./HeaderTitle";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShoppingBagIcon sx={{ display: "flex", mr: 1 }} />
            <HeaderTitle />
            <Box sx={{ flexGrow: 15, display: { xs: "flex", md: "flex" } }}>
              <SearchBar text={text} setText={setText}></SearchBar>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button onClick={toHome} sx={{ color: "white" }}>
                Home
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <HeaderMenu
                anchorElUser={anchorElUser}
                handleCloseUserMenu={handleCloseUserMenu}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
