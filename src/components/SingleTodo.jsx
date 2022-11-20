import React from 'react';
import {FaEdit} from "react-icons/fa";
import {GiCheckMark} from "react-icons/gi";
import {VscTrash} from "react-icons/vsc";



const SingleTodo = (props) => {
    const {todo, handleDelete, handleEdit, handleComplete} = props;
    return (
        <div className="todo__item" key={todo.id}>
            <div className="todo__item-text">
                <div className="todo__item-text-title">
                    <h2 className="todo__item-title">{todo.title}</h2>
                    <div className="todo__item-btns">
                        <FaEdit
                            className="todo__item-btn edit"
                            onClick={() => handleEdit(todo.id)}
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
                <div className="todo__item-text-description">
                    <img src={todo.image}
                         alt="todo"
                         loading="lazy"
                         className="todo__item-img"
                    />
                    <p className="todo__item-description">{todo.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleTodo;