import React from 'react';




const CreateTodo = (props) => {
    const {handleCreate, titleChange, desChange, imgChange, title, description, image} = props;
    return (
        <article className="create-todo">
            <div className='create-todo__title'>
                <h1 className='create-todo__title-text'>Create Todo</h1>
            </div>
            <div className="create-todo__form">
                <form className="create-todo__form-content" onSubmit={handleCreate}>
                    <div className="create-todo__form-input">
                        <label htmlFor="title" className="create-todo__form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
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
                            value={description}
                            className="create-todo__form-input-text"
                            placeholder="Enter a description"
                        />
                    </div>

                    <div className="create-todo__form-input">
                        <label htmlFor="image" className="create-todo__form-label">Image</label>
                        <input
                            type="file"
                            id="image"
                            value={image}
                            onChange={imgChange}
                            accept="image/*"
                            className="create-todo__form-input-text"
                        />
                    </div>
                </form>
            </div>
            <button className="create-todo__btn" onClick={handleCreate}>Create Todo</button>
        </article>
    );
};

export default CreateTodo;