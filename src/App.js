import React from 'react';
import Card from "./components/Card/Card.js";
import Header from "./components/Header/Header";
import axios from "axios";


import ShopCart from "./components/ShopCart/ShopCart";

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
    });
  }, []);

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

  return (
    <div className='wrapper clear'>
      {cartOpened &&
        <ShopCart items={cartItems} onClose={() => setCartOpened(false)}
                  onRemove={onRemoveCart}/>}
      <Header onClickCart={() => setCartOpened(true)}/>
      <div className="content">
        <div className="information">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className='searchBlock'>
            <img src="/img/search.svg" alt="search"/>
            {searchValue &&
              <img onClick={() => setSearchValue('')} className='clear'
                   src="/img/delete.svg"
                   alt="clear"/>}
            <input onChange={onChangeSearchInput} value={searchValue}
                   placeholder="Поиск..."/>
          </div>
        </div>
        <div className="sneakers">
          {items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
            <Card url={item.imageURL}
                  name={item.name}
                  price={item.price}
                  onClickFavorite={(obj) => onAddToFavorites(obj)}
                  onClickPlus={(obj) => onAddToCart(obj)}
            />))}
        </div>
      </div>
    </div>
  );
}

export default App;
