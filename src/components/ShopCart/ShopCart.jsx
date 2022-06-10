import React, {useContext, useState} from 'react';
import './ShopCart..scss'
import {priceTab} from "../Card/Card";
import {AppContext} from "../../App";
import Info from "../Info/Info";

function ShopCart() {
  const {cartItems} = useContext(AppContext)
  const {onClose} = useContext(AppContext);
  const {setCartItems} = useContext(AppContext)
  const {onRemoveCart} = useContext(AppContext);

  const [isOrderCopmpeted, setIsOrderCopmpeted] = useState(false);

  const onClickOrder = () => {
    setIsOrderCopmpeted(true);
    setCartItems([]);
  }

  const value = cartItems.reduce((sum, current) => sum + Number(current.price), 0);

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина <img onClick={onClose}
                         className='remove-btn'
                         src="/img/delete.svg"
                         alt="delete"/></h2>
        {
          cartItems.length > 0
            ? <div className="items">
              <div className="itemsArea">
                {cartItems.map((obj) => (
                  <div key={obj.id} className="cartItem">
                    <img src={obj.url} alt="sneakers"/>
                    <div className="item">
                      <p>{obj.name}</p>
                      <b>{priceTab(obj.price)}</b>
                    </div>
                    <img onClick={onRemoveCart(obj.id)} className='remove-btn'
                         src="/img/delete.svg" alt="delete"/>
                  </div>))}
              </div>
              <div className='cardTotal'>
                <ul>
                  <li>
                    <span>Итого</span>
                    <div></div>
                    <b>{priceTab(value)}</b>
                  </li>
                  <li>
                    <span>В том числе налог 20%:</span>
                    <div></div>
                    <b>{priceTab(value * 0.20)}</b>
                  </li>
                </ul>
                <button onClick={onClickOrder} className='greenButton'>Оформить
                  заказ <img
                    className='arrowForward'
                    src="/img/arrow.svg" alt="arrow"/></button>
              </div>
            </div> :
            <
              Info
              title="Корзина пустая"
              description="Добавьте хотя-бы одну пару
              кроссовок что-бы сделать заказ."
              image="../../img/emptyCart.png"
            />
        }
      </div>
    </div>
  );
}

export default ShopCart;
