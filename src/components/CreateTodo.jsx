import React from 'react';
import {MdClose} from "react-icons/md";


/**
 * @param {object} props - объект с параметрами
 * @param {string} props.title - заголовок
 * @param {string} props.description - описание
 * @param {string} props.image - ссылка на изображение
 * @param {string} props.date - дата создания
 * @param {function} props.closeShowTodo - функция закрытия модального окна
 * @returns {JSX.Element} - возвращает JSX элемент
 * @constructor
 */

const CreateTodo = (props) => {
    const {handleCreate, type, onSubmit, closeEdit, createTitle, titleValue, descriptionValue, titleChange, desChange, imgChange} = props;

    return (
        <article className="create-todo">
            <div className='create-todo__title'>
                <h1 className='create-todo__title-text'>{createTitle}</h1>
            </div>
            <div className="create-todo__form">
                <form className="create-todo__form-content" onSubmit={onSubmit}>
                    <div className="create-todo__form-input">
                        <label htmlFor="title" className="create-todo__form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={titleValue}
                            onChange={titleChange}
                            className="create-todo__form-input-text"
                            placeholder="Enter a title"
                        />
                    </div>

                    <div className="create-todo__form-input">
                        <label htmlFor="description" className="create-todo__form-label">Description</label>
                        <textarea
                            id="description"
                            onChange={desChange}
                            value={descriptionValue}
                            className="create-todo__form-input-text"
                            placeholder="Enter a description"
                        />
                    </div>

                    <div className="create-todo__form-input">
                        <label htmlFor="image" className="create-todo__form-label">Image</label>
                        <input
                            type="file"
                            id="image"
                            onChange={imgChange}
                            accept="image/*"
                            className="create-todo__form-input-text"
                        />
                    </div>
                </form>
            </div>
            <button className="create-todo__btn" onClick={handleCreate}>{createTitle}</button>
            {
                type === 'edit' ?
                    <MdClose
                        size={30}
                        fill='white'
                        className='edit-icon'
                        onClick={closeEdit}
                    /> : null
            }

        </article>
    );
};

export default CreateTodo;