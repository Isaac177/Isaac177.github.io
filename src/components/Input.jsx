import React from 'react';



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
    const {createTodo, value, onChange, onClick, onImageChange} = props;
    return (
        <form onSubmit={createTodo}>
            <div className="todo__input">
                <input
                    className="todo__input-text"
                    type="text"
                    placeholder="Enter a task"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" onClick={onClick} className='todo__input-btn'>
                    Add
                </button>
            </div>
            <div className="todo__input-image">
                <label htmlFor="image" className="todo__input-image-label">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={onImageChange}
                    />
                    <span className="todo__input-image-text">Add image</span>
                </label>
            </div>
        </form>
    );
};

export default Input;