import React from 'react';
import {Route, Routes} from "react-router-dom";
// import Card from "./components/Card/Card.jsx";
import Header from "./components/Header/Header.jsx";
import axios from "axios";
import Home from "./components/pages/Home.jsx";
import ShopCart from "./components/ShopCart/ShopCart";
import Favorites from "./components/pages/Favorites";


function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/items").then(res => {
      setItems(res.data);
    });

    axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/cart").then(res => {
      setCartItems(res.data);
    });

    axios.get("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities").then(res => {
      setFavorites(res.data);
      console.log(favorites);
    });
  }, []);

  React.useEffect(() => {

    const onAddToCart = (obj) => {
      axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj])
    };

    const onAddToFavorites = (obj) => {
      axios.post("https://629a50c37b866a90ec4d63ed.mockapi.io/favorities", obj);
      setFavorites((prev) => [...prev, obj])
    };

    const onRemoveCart = (id) => {
      axios.delete(`https://629a50c37b866a90ec4d63ed.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value)
    };

  }

  return (
    <div className='wrapper clear'>
      {cartOpened &&
        <ShopCart items={cartItems} onClose={() => setCartOpened(false)}
                  onRemove={onRemoveCart}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Routes>
        <Route exact path="/home"
               element={<Home searchValue={searchValue}
                              items={items}
                              setSearchValue={setSearchValue}
                              onChangeSearchInput={onChangeSearchInput}
                              onAddToFavorites={onAddToFavorites}
                              onAddToCart={onAddToCart}/>}/>
      </Routes>
      <Routes>
        <Route exact path="/favorites"
               element={<Favorites items={favorites}
                                   onAddToCart={onAddToCart}/>}/>
      </Routes>
    </div>
  );
}

export default App;
