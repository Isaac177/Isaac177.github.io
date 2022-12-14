import React from 'react';
import {FaEdit} from "react-icons/fa";
import {GiCheckMark} from "react-icons/gi";
import {VscTrash} from "react-icons/vsc";
import dayjs from 'dayjs';
import ShowTodo from "./ShowTodo";


/**
 * @description Компонент SingleTodo
 * @param {object} props - пропсы
 * @param {object} props.todo - объект todo
 * @param {function} props.handleDelete - функция удаления todo
 * @param {function} props.onClick - функция редактирования todo
 * @param {function} props.handleComplete - функция завершения todo
 * @returns {JSX.Element} - возвращает JSX элемент
 */


const SingleTodo = (props) => {
    const {todo, handleDelete, onClick, handleComplete} = props;
    const [showTodo, setShowTodo] = React.useState(false);

    /*styles that display only one line of text*/
    const titleStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
    };

    return (
        <>
        <div className="todo__item" key={todo.id} >
            <div className="todo__item-text">
                <div className="todo__item-text-title">
                    <h2
                        className={`todo__item-title 
                        ${todo.completed ? 
                            'todo__item-title--completed' 
                            : ''}`}>
                        {todo.title}
                    </h2>
                    <div className="todo__item-btns">
                        <FaEdit
                            className="todo__item-btn edit"
                            onClick={onClick}
                            size={20}
                        />
                        <GiCheckMark
                            className="todo__item-btn complete"
                            onClick={() => handleComplete(todo.id)}
                            size={20}
                        />
                        <VscTrash
                            className="todo__item-btn delete"
                            onClick={() => handleDelete(todo.id)}
                            size={20}
                        />
                    </div>
                </div>
                <div className="todo__item-text-description" onClick={() => setShowTodo(!showTodo)}>
                    <img src={todo.image}
                         alt="todo"
                         loading="lazy"
                         className="todo__item-img"
                    />
                    <p className={titleStyle}>
                    {todo.description}</p>
                </div>
                <div className="todo__item-text-date">
                    <p className="todo__item-date">{
                        `Created the ${dayjs(todo.date).format('DD/MM/YYYY')} at ${dayjs(todo.date).format('HH:mm')}`
                    }</p>
                </div>
            </div>
        </div>
            {showTodo &&
                <ShowTodo
                    todo={todo}
                    closeShowTodo={() => setShowTodo(!showTodo)}
                />
            }
            </>
    );
};

export default SingleTodo;