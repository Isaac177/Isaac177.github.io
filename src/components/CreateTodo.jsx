import React from 'react';


const CreateTodo = (props) => {
    const {handleCreate, onSubmit, createTitle, titleValue, descriptionValue, titleChange, desChange, imgChange} = props;

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
        </article>
    );
};

export default CreateTodo;