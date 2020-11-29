import React from "react";
import classNames from 'classnames';
import axios from 'axios';

import Badge from "../Badge";
import removeSvg from "../../assets/img/remove.svg";


import "./List.scss";

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {

  const removeList = (item) => {
    if(window.confirm("Вы дейстивительно хотите удалить этот список?")) {
      axios.delete("http://localhost:3000/lists/" + item.id)
      .then(() => onRemove(item.id));      
    }    
  }
  

  return (
    <ul onClick={onClick} className="list">
      {items.map(item => (
          <li onClick ={onClickItem ? () => onClickItem(item) : null} key={Math.random()} className={classNames(item.className, {'active': activeItem && activeItem.id === item.id})}>
            <i>
            {item.icon ? item.icon : <Badge color={item.color.name}/> }
            </i>
          <span>{item.name}{item.tasks ? `(${item.tasks.length})` : ''}</span>
          {isRemovable ? <img onClick={() => removeList(item)} src={removeSvg} className="list__remove-icon" alt="icon remove"/> : ''}          
          </li>        
      ))}      
    </ul>
  );
};

export default List;
