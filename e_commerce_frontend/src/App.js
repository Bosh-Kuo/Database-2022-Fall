import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Transaction from "./components/pages/Transaction";
import User from "./components/pages/User";
import Wishlist from "./components/pages/Wishlist";
import Layout from "./components/Layout/Layout";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* 非指定的 pathname 都會導向 home */}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="product" element={<Product />} />
          <Route path="user" element={<User />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
