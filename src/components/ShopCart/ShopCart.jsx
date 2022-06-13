import React, {useContext, useState} from 'react';
import './ShopCart.scss'
import {AppContext} from "../../App";
import Info from "../Info/Info";
import ShopCard from "../Card/ShopCard";
import axios from "axios";

function ShopCart() {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const {cartItems} = useContext(AppContext)
  const {onClose} = useContext(AppContext);
  const {setCartItems} = useContext(AppContext);
  const {priceRef} = useContext(AppContext);
  const {sumPrice} = useContext(AppContext);

  // const delay = () => new Promise((resolve) => setTimeout(resolve, 50));

  const onClickOrder = async () => {
    try {
      const {data} = await axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/orders", {
        items: cartItems,
        date: new Date(),
      });
      setOrderId(data.id);
      setIsOrderCompleted(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://629a50c37b866a90ec4d63ed.mockapi.io/cart/' + item.id);
      }
      setCartItems([]);
    } catch (e) {
      alert(`Не удалось создать заказ: ${e.name}`);
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина <img onClick={() => onClose()}
                         className='remove-btn'
                         src="/img/delete.svg"
                         alt="delete"/></h2>
        {cartItems.length > 0
          ? (<div className="items">
            <div className="itemsArea">
              {cartItems.map((item) => (
                <
                  ShopCard
                  item={item}
                  key={item.id}
                  id={item.id}
                  url={item.url}
                  name={item.name}
                  price={item.price}
                />))
              }
            </div>
            <div className='cardTotal'>
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{priceRef()}</b>
                </li>
                <li>
                  <span>В том числе НДС:</span>
                  <div></div>
                  <b>{priceRef(sumPrice / 5)}</b>
                </li>
              </ul>
              <button onClick={onClickOrder}
                      className='greenButton'>Оформить
                заказ <img
                  className='arrowForward'
                  src="/img/arrow.svg" alt="arrow"/></button>
            </div>
          </div>) : (
            <Info
              title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderCompleted ? `Ваш заказ ${orderId} скоро будет
               передан курьерской доставке`
                : "Добавьте хотя-бы одну пару кроссовок что-бы сделать заказ."}
              image={isOrderCompleted ? "../../img/orderCompleted.jpg"
                : "../../img/emptyCart.png"}
            />
          )
        }
      </div>
    </div>
  );
}

export default ShopCart;
