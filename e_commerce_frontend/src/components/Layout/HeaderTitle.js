import React from "react";
import Typography from "@mui/material/Typography";

const HeaderTitle = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="a"
      sx={{
        mr: 2,
        display: { xs: "flex", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
      }}
    >
      E-Commerce
    </Typography>
  );
};

export default HeaderTitle;
