import React, { useEffect } from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox } from "@mui/material";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

let testCart = [
  {
    id: 1,
    name: "Lizard",
    price: 500,
  },
  {
    id: 2,
    name: "Rabbit",
    price: 300,
  },
  {
    id: 5,
    name: "textbook",
    price: 1000,
  }
]
/* TODO: 我沒有 import 登入相關的訊息資料...，登入相關規則還沒建成 */
const Product = ({ item, handleDelete, handleCheck }) => {

  const goToProduct = () => {
    /* TODO: go to product page */
  }

  return (
    <Card sx={{ maxWidth: "100%" }} style={{ display: "flex" }}>
      <CardActions style={{ flex: 1 }}>
        <Checkbox onClick={handleCheck} checked={item.checked} />
      </CardActions>
      <CardActionArea onClick={goToProduct} style={{ flex: 8, display: "flex" }}>
        <CardMedia
          component="img"
          alt={item.name + " image"}
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          style={{ flex: 3 }}
        />
        <CardContent style={{ flex: 7 }}>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ flex: 2 }}>
        <Button size="small" variant="outlined" startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    /*TODO: get cart data from backend */
    // add an attribute "checked" to items
    testCart = testCart.map((item) => ({ ...item, checked: false }))
    setProducts(testCart)
  }, []);
  const handleDelete = (index) => {
    /*TODO: post cart change to backend */
    let products_copy = Array.from(products)
    products_copy.splice(index, 1)
    setProducts(() => (products_copy))
  }
  // change the "checked" attribute of each product
  const handleCheck = (index) => {
    let products_copy = Array.from(products)
    products_copy[index].checked = !products[index].checked
    setProducts(products_copy)
  }
  // buy product, remove bought ones from cart
  const handleBuy = () => {
    /*TODO: post transaction, update cart */
    let buy_products = [];
    let keep_products = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].checked)
        buy_products.push(products[i])
      else
        keep_products.push(products[i])
    }
    setProducts(keep_products)
    console.log(buy_products)
  }
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      margin: 0
    }}>
      <Paper sx={{ width: "600px" }}>
        <Typography variant="h3" component="div" sx={{
          width: "100%", textAlign: "center",
          color: "white", bgcolor: 'primary.main',
        }}>Cart</Typography>
        <Stack spacing={1} justifyContent="center">
          {products.map((item, index) => (
            <Product key={index}
              item={item}
              handleDelete={() => { handleDelete(index) }}
              handleCheck={() => { handleCheck(index) }}
            />
          ))}
        </Stack>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          sx={{ width: "100%" }}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </Paper>
    </Box >
  );
}
export default Cart;
