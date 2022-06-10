import React, {useContext} from 'react';
import './Header.scss';
import {Link} from "react-router-dom";
import {AppContext} from "../../App";
import priceTab from "../Card/Card";

function Header() {
  const {onOpen} = useContext(AppContext);

  return (
    <header>
      <Link to="/">
        <img alt={'logo'} width={40} height={40} src='/img/logo.png'/>
        <div className='headerInfo'>
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='headerTotal'>
        <li onClick={onOpen}>
          <img alt={'shopCard'} width={20} height={20}
               src='/img/shopCard.svg'/>
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/likeGrey.svg" alt="favorites" width={20}
                 height={20}/>
          </Link>
        </li>
        <li>
          <Link to="/orders"/>
          <img alt={'userIcon'} width={20} height={20} src='/img/user.svg'/>
        </li>
      </ul>
    </header>
  );
}

export default Header;