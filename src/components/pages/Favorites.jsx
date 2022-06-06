import React from 'react';
import Card from "../Card/Card";


function Favorites(items, onAddToCart) {
  return (
    <div className="content">
      <div className="information">
        <h1>Мои закладки</h1>
      </div>
      <div className="favoritesList">
        {items.map((item, index) => (
          <Card key={index}
                url={item.imageURL}
                name={item.name}
                price={item.price}
                onClickPlus={(obj) => onAddToCart(obj)}
          />))}
      </div>
    </div>
  );
}

export default Favorites;