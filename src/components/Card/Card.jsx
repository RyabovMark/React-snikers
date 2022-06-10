import React, {useContext} from "react";
import ContentLoader from "react-content-loader";
import "./Card.scss";
import {AppContext} from "../../App";

function priceTab(price) {
  const strFrm = new Intl.NumberFormat('ru-Ru').format(price);
  return `${strFrm} руб.`;
}

function Card({
                item,
                id,
                url,
                name,
                price,
                loading = false,
              }) {

  const {isAddedToCard} = useContext(AppContext);
  const {isAddedToFav} = useContext(AppContext);
  const {onAddToCart} = useContext(AppContext);
  const {onAddToFavorites} = useContext(AppContext);

  const handleOnPlus = () => {
    onAddToCart({id, name, url, price});

  };

  const handleOnFavorites = () => {
    onAddToFavorites({id, name, url, price});
  };

  return (
    <div className='card'>
      {
        loading ? <ContentLoader
            speed={2}
            width={145}
            height={240}
            viewBox="0 0 155 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="2" y="36" rx="10" ry="10" width="160" height="90"/>
            <rect x="2" y="151" rx="5" ry="5" width="160" height="20"/>
            <rect x="2" y="182" rx="5" ry="5" width="100" height="20"/>
            <rect x="2" y="230" rx="5" ry="5" width="90" height="24"/>
            <rect x="118" y="225" rx="5" ry="5" width="32" height="32"/>
          </ContentLoader>
          :
          <>
            <div className='favorite' onClick={handleOnFavorites}>
              <img src={isAddedToFav(item) ? '/img/likePink.svg' : '/img/likeGrey2.svg'}
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
                     src={isAddedToCard(item) ? '/img/btnChecked.svg' : '/img/btnUnchecked.svg'}
                     alt="plus"/>
              </div>
            </div>
          </>
      }
    </div>
  );
}

export default Card;
export {priceTab}

