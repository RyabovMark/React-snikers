import React, {useContext} from 'react';
import "./Info.scss";
import {AppContext} from "../../App";

const Info = ({title, description, image}) => {

  const {onClose} = useContext(AppContext);

  return (
    <div className="emptyCart">
      <img src={image} alt={image.name}/>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClose} className='greenButton'><img
        className='arrowBack' src="/img/arrowBack.svg"
        alt="back"/>
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;