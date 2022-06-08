import React, {createContext, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import axios from "axios";
import Home from "./components/Pages/Home.jsx";
import ShopCart from "./components/ShopCart/ShopCart";
import Favorites from "./components/Pages/Favorites";

// const appContext=createContext({});



function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => item.id === obj.id)) {
      axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj])
    }
  };

  const onAddToFavorites = (obj) => {
    if (favorites.find(item => item.id === obj.id)) {
      axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/favorities/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities", obj);
      setFavorites((prev) => [...prev, obj])
    }
  };

  const onRemoveCart = (id) => {
    axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };

  useEffect( () => {
    async function fetchData() {
      const cartResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities");
      const itemsResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/items");

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  return (
    // <AppContext.Provider>
      <div className='wrapper clear'>
        {
          cartOpened &&
          <ShopCart
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveCart}
          />
        }
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route
            exact path="/"
            element=
              {
                <
                  Home
                  items={items}
                  cartItems={cartItems}
                  favorites={favorites}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorites={onAddToFavorites}
                  onAddToCart={onAddToCart}
                  isLoading={isLoading}
                />
              }
          />
        </Routes>
        <Routes>
          <Route
            exact path="/favorites"
            element=
              {
                <Favorites
                  items={favorites}
                  onAddToCart={onAddToCart}
                  onAddToFavorites={onAddToFavorites}
                />
              }
          />
        </Routes>
      </div>
    // </AppContext.Provider>

  );
}

export default App;
