import React from 'react';
import dayjs from "dayjs";


/**
 * @param {object} props - объект с параметрами
 * @param {object} props.todo - объект с данными
 * @param {function} props.closeShowTodo - функция закрытия модального окна
 * @returns {JSX.Element} - возвращает JSX элемент
 * @constructor
 */


const ShowTodo = (props) => {
 const {todo, closeShowTodo} = props;

    return (
        <div className="show-single-todo">
            <div className="show-single-todo__container">
                <div className="show-single-todo__container-title">
                    <h1 className="show-single-todo__title">{todo.title}</h1>
                </div>
                <div className="show-single-todo__container-description">
                    <img src={todo.image} alt="todo" loading="lazy" className="show-single-todo__img"/>
                    <div className="show-single-todo__description">
                        <p className="show-single-todo__description-text">{todo.description}</p>
                        <p style={{color:'#060638'}}>{
                            `Created the ${dayjs(todo.date).format('DD/MM/YYYY')} at ${dayjs(todo.date).format('HH:mm')}`
                        }</p>
                        <button className="show-single-todo__btn" onClick={closeShowTodo}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ShowTodo;