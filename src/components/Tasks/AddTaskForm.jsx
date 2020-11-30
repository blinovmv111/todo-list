import React, {useState} from 'react';
import addSvg from "../../assets/img/add.svg"
import axios from 'axios';

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }        
        if(!inputValue) {
            alert("Введите задачу");
            return;
        }
        setIsLoading(true);
        axios.post("http://localhost:3000/tasks", obj)
        .then(({data}) => {
            console.log(data);
            onAddTask(list.id, obj);
            toggleFormVisible();
        })
        .catch(() => {alert('Ошибка при добавлении задачи')})
        .finally(() => setIsLoading(false));
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? 
            <div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addSvg} alt="Add icon"/>
                <span>Новая задача</span>
            </div> :
            <div className="tasks__form-block">
                <input 
                    className="field" 
                    placeholder="Текст задачи"
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                ></input>
                <button disabled={isLoading} className="button" onClick={addTask}>{isLoading ? "Добавление..." : "Добавить задачу"}</button>
                <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
            </div>
            }            
        </div>
    );
};

export default AddTaskForm;