import React, {useState, useEffect} from "react";
import axios from 'axios';

import List from "../List";
import Badge from "../Badge";
import './AddButtonList.scss';

import closeBtn from '../../assets/img/close.svg';

const AddList = ({colors, onAdd}) => {

  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if(Array.isArray(colors)) {      
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    selectColor(colors[0].id);
    setInputValue('');
  }

  const addList = () => {
    if(!inputValue) {
      alert("Введите название списка");
      return;
    }   
    setIsLoading(true);
    axios.post("http://localhost:3000/lists", {name: inputValue, colorId: selectedColor})
    .then(({data}) => {
      const color  = colors.find(c => c.id === selectedColor).name;
      const listObj = {...data, color: {name: color}};
      onAdd(listObj);
      onClose();
    })
    .catch(() => {alert('Ошибка при добавлении списка')})
    .finally(
      setIsLoading(false));
    // onAdd({id: Math.random(), name: inputValue, color: {name: color}});
  };

  
  return (
    <div className="add-list">
    <List onClick={() => setVisiblePopup(true)} items={[
      {
        className: 'list__add-button',
        icon: (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1V11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 6H11" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>),
        name: "Добавить список"
      }]}
      />
      
      {visiblePopup && (<div className="add-list__popup">
        <input 
        className="field" 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Название списка"
        type='text'
        value={inputValue}
        ></input>
        <ul className="add-list__popup-colors">
          {colors.map(color => (
            <Badge 
            onClick={() => selectColor(color.id)} 
            key={color.id} 
            color={color.name}
            className={selectedColor === color.id && 'active'}
            />         
          ))}
        </ul>
          <button className="button" onClick={addList}>{isLoading ? "Добавление..." : "Добавить"}</button>
        <img onClick={onClose} src={closeBtn} className="add-list__popup-close-btn" alt="icon close"/>
      </div>)}
      
    </div>
  );
    
};

export default AddList;
