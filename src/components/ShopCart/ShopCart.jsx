import React from 'react';
import './ShopCart..scss'

function ShopCart({onClose, onRemove, items = []}) {
  function priceTab(price) {
    const strFrm = new Intl.NumberFormat('ru-Ru').format(price);
    return `${strFrm} руб.`;
  }

  const value = items.reduce((sum, current) => sum + Number(current.price), 0);

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>Корзина <img onClick={onClose} className='remove-btn'
                         src="/img/delete.svg"
                         alt="delete"/></h2>
        {
          items.length > 0 ? <div className="items">
            <div className="itemsArea">
              {items.map((obj) => (
                <div className="cartItem">
                  <img src={obj.url} alt="sneakers"/>
                  <div className="item">
                    <p>{obj.name}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img onClick={() => onRemove(obj.id)} className='remove-btn'
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
                  <b>{priceTab(value*0.20)}</b>
                </li>
              </ul>
              <button className='greenButton'>Оформить заказ <img
                className='arrowForward'
                src="/img/arrow.svg" alt="arrow"/></button>
            </div>
          </div> : <div className="emptyCart">
            <img src="/img/emptyCart.png" alt="emptyCart"/>
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onClose} className='greenButton'><img
              className='arrowBack' src="/img/arrowBack.svg"
              alt="back"/>Вернуться назад
            </button>
          </div>
        }
      </div>
    </div>
  );
}

export default ShopCart;