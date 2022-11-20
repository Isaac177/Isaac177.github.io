import React from 'react';
import CreateTodo from "./CreateTodo";



const CreateBtn = (props) => {
    const [showCreate, setShowCreate] = React.useState(false);
    const {handleCreate, handleChange} = props;
    return (
        <div className="create__btn">
            <button
                className="todo__create"
                onClick={() => setShowCreate(!showCreate)}
            >
                Create
            </button>
            {showCreate && <CreateTodo
                handleCreate={handleCreate}
                onChange={handleChange}
            />
            }
        </div>
    );
};

export default CreateBtn;