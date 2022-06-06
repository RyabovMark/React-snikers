import Card from "../Card/Card";
import React from 'react';


function Home({
                items,
                searchValue,
                onChangeSearchInput,
                setSearchValue,
                onAddToFavorites,
                onAddToCart
              }) {
  return (
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
  );
}

export default Home;