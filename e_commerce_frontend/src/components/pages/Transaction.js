import { Space, Table, Tag } from "antd";
import axios from "../../axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthProvider";

const columns = [
  {
    title: "Product Id",
    dataIndex: "product",
    key: "productId",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "product",
  },
  {
    title: "Seller",
    dataIndex: "sellerName",
    key: "seller",
  },
  {
    title: "Buyer",
    dataIndex: "buyerName",
    key: "buyer",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const Transaction = () => {
  const [BuyerTrans, setBuyerTrans] = useState([]);
  const [SellerTrans, setSellerTrans] = useState([]);
  const { profile } = useContext(AuthContext);
  useEffect(() => {
    axios.get("transactionBuyer/" + profile.id).then((res) => {
      console.log(res.data.data);
      setBuyerTrans(res.data.data);
    });
    axios.get("transactionSeller/" + profile.id).then((res) => {
      setSellerTrans(res.data.data);
    });
  }, []);

  return (
    <div style={{ marginLeft: "30px" }}>
      <h1>Buy</h1>
      <Table columns={columns} dataSource={BuyerTrans} />

      <h1>Sell</h1>
      <Table columns={columns} dataSource={SellerTrans} />
    </div>
  );
};
export default Transaction;
