import React from 'react';
import {BsPlusLg} from "react-icons/bs";


/**
 * @param {object} props  - объект с параметрами
 * @param {function} props.handleSubmit - функция, которая вызывается при отправке формы
 * @param {string} props.value - значение инпута
 * @param {function} props.onChange - функция, которая вызывается при изменении инпута
 * @param {function} props.onClick - функция, которая вызывается при клике на кнопку
 * @param props - объект с параметрами
 * @returns {JSX.Element} - возвращает JSX элемент
 */

const Input = (props) => {
    const {handleSubmit, value, onChange, onClick} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="todo__input">
                <input
                type="text"
                placeholder="Enter a task"
                value={value}
                onChange={onChange}
                />
                <BsPlusLg onClick={onClick} className="todo__input-btn"/>
            </div>
        </form>
    );
};

export default Input;