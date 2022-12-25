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

let testWish = [
  {
    id: 2,
    name: "Rabbit",
    price: 300,
  },
  {
    id: 3,
    name: "dragon ball",
    price: 100000,
  },
  {
    id: 4,
    name: "fire fruit",
    price: 10,
  },
  {
    id: 5,
    name: "textbook",
    price: 1000,
  }
]
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
const Product = ({ item, handleDelete }) => {

  const goToProduct = () => {
    /* TODO: go to product page */
  }

  const handleAdd = () => {
    /* TODO: add product to cart */
    /* NOTE: 不要管他之前有沒有被加進 cart， 目前也不會顯示出有沒有在 cart 中 */
    console.log("add to cart")
  }

  return (
    <Card sx={{ maxWidth: "100%" }} style={{ display: "flex" }}>
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
      <CardActions sx={{ flex: 2 }}>
        <Button size="small" variant="outlined" startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button size="small" variant="outlined" startIcon={<ShoppingCartIcon />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    /*TODO: get wishlist data from backend */
    setWishList(testWish)
  }, []);
  const handleDelete = (index) => {
    /*TODO: post wishlist change to backend */
    let wishList_copy = Array.from(wishList)
    wishList_copy.splice(index, 1)
    setWishList(() => (wishList_copy))
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
        }}>Wish List</Typography>
        <Stack spacing={1} justifyContent="center">
          {wishList.map((item, index) => (
            <Product key={index}
              item={item}
              handleDelete={() => { handleDelete(index) }}

            />
          ))}
        </Stack>
      </Paper>
    </Box >
  );
}

export default Wishlist;
