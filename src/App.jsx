import React, {createContext, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import axios from "axios";
import Home from "./components/Pages/Home.jsx";
import ShopCart from "./components/ShopCart/ShopCart";
import Favorites from "./components/Pages/Favorites";

export const AppContext = createContext({});

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

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/items");
      const favoritesResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities");
      const cartResponse = await axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/cart");

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const isAddedToCard = (item) => {
    return cartItems.some(obj => obj.id === item.key)
  };

  const isAddedToFav = (item) => {
    return (items.some(obj => obj.id === item.key)) || (favorites.some(obj => obj.id === item.key))
  };

  const onClose=() => setCartOpened(false);
  const onOpen=() => setCartOpened(true);

  console.log("cartItems", cartItems);

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        searchValue,
        setSearchValue,
        isLoading,
        setCartItems,
        setCartOpened,
        isAddedToCard,
        isAddedToFav,
        onAddToCart,
        onAddToFavorites,
        onClose,
        onOpen,
        onRemoveCart,
        onChangeSearchInput
      }}
    >
      <div className='wrapper clear'>
        {cartOpened && <ShopCart/>}
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route
            exact path="/favorites"
            element={<Favorites/>}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;