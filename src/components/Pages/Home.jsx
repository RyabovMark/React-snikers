import Card from "../Card/Card";
import React from 'react';

function Home({
                items,
                favorites,
                cartItems,
                searchValue,
                onChangeSearchInput,
                setSearchValue,
                onAddToFavorites,
                onAddToCart,
                isLoading,
              }) {

  const renderItems = () => {
    const filteredItems = items.filter(item =>
      item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase()));
    return (
      isLoading ? Array(10).fill({}) : filteredItems)
      // filteredItems
      .map((item,index) => (
          <
            Card
            key={item.key||index}
            id={item.key}
            url={item.imageURL}
            name={item.name}
            price={item.price}
            added={cartItems.some(obj => obj.id === item.key)}
            favorited={favorites.some(obj => obj.id === item.key)}
            onClickFavorite={(obj) => onAddToFavorites(obj)}
            onClickPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
          />

        )
      );
  }


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
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;