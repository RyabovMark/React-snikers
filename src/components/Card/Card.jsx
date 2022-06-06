import React from "react";
import "./Card.scss";

function priceTab(price) {
  const strFrm = new Intl.NumberFormat('ru-Ru').format(price);
  return `${strFrm} руб.`;
}

function Card({url, name, price, onClickFavorite, onClickPlus}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleOnPlus = () => {
    onClickPlus({name, url, price});
    setIsAdded(!isAdded);
  }

  const handleOnFavorites = () => {
    onClickFavorite({name, url, price})
    setIsFavorite(!isFavorite);
  }

  return (
    <div className='card'>
      <div className='favorite' onClick={handleOnFavorites}>
        <img src={isFavorite ? '/img/likePink.svg' : '/img/likeGrey2.svg'}
             alt="likeGrey" width={30} height={30}/>
      </div>
      <img width={133} height={112} src={url} alt={'1'}/>
      <div className="search">
        <h5>{name}</h5>
      </div>
      <div className='cardFooter'>
        <div className='total'>
          <span className='price'>Цена:</span>
          <b className='cost'>{priceTab(price)}</b>
        </div>
        <div>
          <img onClick={handleOnPlus}
               src={isAdded ? '/img/btnChecked.svg' : '/img/btnUnchecked.svg'}
               alt="plus"/>
        </div>
      </div>
    </div>
  );
}

export default Card;

