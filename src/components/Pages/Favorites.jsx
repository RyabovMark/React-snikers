import React from 'react';
import Card from "../Card/Card";
import './Favorites.scss'


function Favorites({items, onAddToCart, onAddToFavorites}) {
  return (
    <div className="content">
      <div className="information">
        <h1>Мои закладки</h1>
      </div>
      <div className="favoritesList">
        {items.map((item) => (
          <Card key={item.id}
                id={item.id}
                url={item.url}
                name={item.name}
                price={item.price}
                favorited={true}
                onClickPlus={(obj) => onAddToCart(obj)}
                onClickFavorite={onAddToFavorites}
          />))}
      </div>
    </div>
  );
}

export default Favorites;