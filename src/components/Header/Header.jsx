import React from 'react';
import './Header.scss';
import {Link} from "react-router-dom";


function Header(props) {
  return (
    <header>
      <Link to="/home">
        <img alt={'logo'} width={40} height={40} src='/img/logo.png'/>
        <div className='headerInfo'>
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='headerTotal'>
        <li onClick={props.onClickCart}>
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
          <img alt={'userIcon'} width={20} height={20} src='/img/user.svg'/>
        </li>
      </ul>
    </header>
  );
}

export default Header;