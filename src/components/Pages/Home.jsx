import React, {useContext} from 'react';
import {AppContext} from "../../App";
import Card from "../Card/Card";

function Home() {

  const {items} = useContext(AppContext);
  const {searchValue} = useContext(AppContext);
  const {setSearchValue} = useContext(AppContext);
  const {onChangeSearchInput} = useContext(AppContext);
  const {isLoading} = useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter(item =>
      item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase()));
    return (
      isLoading ? Array(12).fill({}) : filteredItems)
      .map((item, index) => (
          <
            Card
            item={item}
            key={item.key || index}
            id={item.key}
            url={item.imageURL}
            name={item.name}
            price={item.price}
            loading={isLoading}
          />
        )
      );
  }

  return (
    <div className="content">
      <div className="information">
        <div className="banner">
          <img src="/img/banner.png" alt="banner"/>
        </div>
        <div className="homeHeader">
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
      </div>
      <div className="sneakers">
        {renderItems()}
      </div>
    </div>
  );
}

export default Home;