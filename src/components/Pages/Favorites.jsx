import React, {useContext} from 'react';
import Card from "../Card/Card";
import './Favorites.scss'
import {AppContext} from "../../App";

function Favorites() {

  const {favorites} = useContext(AppContext);


  return (
    <div className="content">
      <div className="information">
        <h1>Мои закладки</h1>
      </div>
      <div className="favoritesList">
        {favorites.map((item) => (
          <
            Card
            item={item}
            key={item.id}
            id={item.id}
            url={item.url}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;