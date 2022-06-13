import React, {useContext} from "react";
import {AppContext} from "../../App";

function ShopCard({id, url, name, price, disable = false}) {

  const {onRemoveCart} = useContext(AppContext);
  const {priceRef} = useContext(AppContext);

  return (
    <div key={id} className="cartItem">
      <img src={url} alt="sneakers"/>
      <div className="item">
        <p>{name}</p>
        <b>{`Цена: ${priceRef(price)}`}</b>
      </div>
      {!disable ?
        <img
          onClick={() => onRemoveCart(id)}
          className='remove-btn'
          src="/img/delete.svg"
          alt="delete"/> : null}
    </div>
  );
}

export default ShopCard