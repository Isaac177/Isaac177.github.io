import React, {useEffect} from 'react';
import './App.less';
import Header from "./components/Header";
import {db, storage} from "./firebase";
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc, getDocs,
} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import SingleTodo from "./components/SingleTodo";
import CreateTodo from "./components/CreateTodo";
import {getFirestore} from "@firebase/firestore";



const App = () => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [todos, setTodos] = React.useState([]);
    const [editTitle, setEditTitle] = React.useState('');
    const [editDescription, setEditDescription] = React.useState('');
    const [editImage, setEditImage] = React.useState(null);
    const [edit, setEdit] = React.useState(false)

    const todoRef = collection(db, 'todos');

    const createTodo = async () => {

        if (!title && !description && !image) return;
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                progress === 100 && alert('Upload is completed. Click on the "Create Todo" button to save the data to the database');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                console.log(error);
            }
        )

        await addDoc(todoRef,
            {
                id: Date.now(),
                title: title,
                description: description,
                completed: false,
                createdAt: new Date(),
                image : await getDownloadURL(storageRef),
            });
    setTitle('');
    setDescription('');
    setImage(null);

    window.location.reload();
    }

    useEffect(() => {
        const getTodos = async () => {
            const data = await getDocs(todoRef);
            setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTodos().then(r => console.log(r));
    }, []);


    const handleDelete = async (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        const todoDoc = doc(db, "todos", id);
        await deleteDoc(todoDoc);
    };
    const handleEdit = async (id ) => {
        setEdit(false);
    }

    const handleEditTodoClick = async (todo, id) => {
        setEdit(true);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setEditImage(todo.image);
        console.log(todo.id)

        const db = getFirestore();
        const todoDoc = doc(collection(db, "todos"), id);
        const newFields = {
            title: editTitle,
            description: editDescription,
            image: editImage
        }
        await updateDoc(todoDoc, newFields);
    }

    const handleComplete = async (id) => {
        const todoDoc = doc(db, 'todos', id)
        const newFields = {
            completed: true
        }
        await updateDoc(todoDoc, newFields)
        window.location.reload();
    }

    return (
        <div className="todo">
            <Header />
            <div className="todo__content">
                <CreateTodo
                    createTitle='Create Todo'
                    type='create'
                    handleCreate={createTodo}
                    titleChange={(e) => setTitle(e.target.value)}
                    desChange={(e) => setDescription(e.target.value)}
                    imgChange={(e) => setImage(e.target.files[0])}
                    onSubmit={createTodo}
                />
                <div className="todo__list">
                    {todos.map((todo, index) => (
                        <SingleTodo
                            todo={todo}
                            key={index}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            onClick={() => handleEditTodoClick(todo)}
                        />
                    ))}
                </div>
            </div>}
            {
                edit ? (
                    <div className="todo__item-edit">
                        <CreateTodo
                            createTitle='Edit Todo'
                            type='edit'
                            titleValue={editTitle}
                            descriptionValue={editDescription}
                            image={editImage}
                            titleChange={(e) => setEditTitle(e.target.value)}
                            desChange={(e) => setEditDescription(e.target.value)}
                            imgChange={(e) => setEditImage(e.target.files[0])}
                            handleCreate={handleEdit }
                            onSubmit={handleEdit}
                        />
                    </div>) : null
            }
        </div>
    );
}
export default App;
