import React, {useEffect} from 'react';
import './Orders.scss';
import axios from "axios";
import {useState} from "react";
import ShopCard from "../Card/ShopCard";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
        try {
          const {data} = await axios.get('https://629a50c37b866a90ec4d63ed.mockapi.io/orders');
          setOrders(data.map((obj)=>obj.items).flat());
        } catch (e) {
          alert('Ошибка при запросе заказов');
        }
      }
    )();
  }, []);

  return (
    <div className="content">
      <div className="information">
        <h1>Мои заказы</h1>
      </div>
      <div className="orderList">
        {orders.map((item) => (
          <
            ShopCard
            item={item}
            key={item.id}
            id={item.id}
            url={item.url}
            name={item.name}
            price={item.price}
            disable={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;