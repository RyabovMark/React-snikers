import React, {createContext, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import axios from "axios";
import Home from "./components/Pages/Home.jsx";
import ShopCart from "./components/ShopCart/ShopCart";
import Favorites from "./components/Pages/Favorites";
import Orders from "./components/Pages/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, favoritesResponse, cartResponse] = await Promise.all
        ([
          axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/items"),
          axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities"),
          axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/cart")
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (e) {
        alert(`Ошибка при запросе данных ${e.name}`);
      }
    }
    fetchData();
  }, []);

  const sumPrice = cartItems.reduce((sum, current) => sum + Number(current.price), 0);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find(item => item.id === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        await axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/cart/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj])
        await axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/cart", obj);
      }
    } catch (e) {
      alert(`Ошибка добавления товара в корзину ${e.name}`);
    }
  };

  const onAddToFavorites = (obj) => {
    try {
      if (favorites.find(item => item.id === obj.id)) {
        axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/favorities/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities", obj);
        setFavorites((prev) => [...prev, obj]);
      }
    } catch (e) {
      alert(`Ошибка добавления товара в список отслеживания ${e.name}`);
    }
  };

  const onRemoveCart = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/cart/${id}`);
    } catch (e) {
      alert(`Ошибка удаления товара из корзины ${e.name}`);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const priceRef = (num = sumPrice) => {
    const strFrm = new Intl.NumberFormat('ru-Ru').format(num);
    return `${strFrm} руб.`;
  };

  const isAddedToCard = (item) => {
    return cartItems.some(obj => obj.id === item.key);
  };

  const isAddedToFav = (item) => {
    return (items.some(obj => obj.id === item.key)) || (favorites.some(obj => obj.id === item.key));
  };

  const onClose = () => setCartOpened(false);
  const onOpen = () => setCartOpened(true);

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
        sumPrice,
        cartOpened,
        isAddedToCard,
        isAddedToFav,
        onAddToCart,
        onAddToFavorites,
        onClose,
        onOpen,
        onRemoveCart,
        onChangeSearchInput,
        priceRef
      }}
    >
      <div className='wrapper clear'>
        {cartOpened ? <ShopCart/> : null}
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route
            exact path="/favorites"
            element={<Favorites/>}
          />
          <Route
            exact path="/orders"
            element={<Orders/>}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;