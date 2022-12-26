import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import AuthContext from "../../AuthProvider";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getSellerProducts = async () => {
      const res = await axios.get("sellerProducts/" + profile.id);
      setSellerProducts(res.data.data);
    };
    getSellerProducts();
    // eslint-disable-next-line
  }, [update]);
  console.log(sellerProducts);

  const removeProduct = async (productId) => {
    try {
      await axios.post("products/" + productId, {});
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper style={{ margin: "10px", padding: "50px" }}>
      <Typography variant="h3">My Profile</Typography>
      <Box style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5">{`Full Name: ${profile.username}`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{`Email: ${profile.email}`}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h3" style={{ marginTop: "50px" }}>
        Product
      </Typography>
      <Box style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
        {sellerProducts &&
          sellerProducts.map((product) => {
            return (
              <Card sx={{ width: "300px", margin: "20px" }}>
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => removeProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={product.name}
                  subheader={`Price: ${product.price}`}
                />
                <CardMedia
                  component="img"
                  height="250px"
                  image={"http://127.0.0.1:8000/" + product.image}
                  alt="product"
                />
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => {
                      navigate("/product/" + product.id, {
                        state: {
                          productId: product.id,
                          productName: product.name,
                        },
                      });
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </Paper>
  );
};
export default User;
