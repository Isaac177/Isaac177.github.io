import React, {useEffect} from 'react';
import './App.less';
import Header from "./components/Header";
import {db, storage} from "./firebase";
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc, getDocs, serverTimestamp
} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import SingleTodo from "./components/SingleTodo";
import CreateTodo from "./components/CreateTodo";
import {getFirestore} from "@firebase/firestore";
import Footer from "./components/Footer";


/**
 * @param {string} title - Заголовок задачи
 * @param {string} description - Описание задачи
 * @param {string} image - Картинка задачи
 * @param {boolean} completed - Статус задачи
 * @param {number} createdAt - Дата создания задачи
 * @param {number} id - Уникальный идентификатор задачи
 * @param {function} handleDelete - Функция удаления задачи
 * @param {function} handleEditTodoClick - Функция редактирования задачи
 * @param {function} handleComplete - Функция завершения задачи
 * @param {function} handleEdit - Функция сохранения изменений задачи
 * @param {boolean} edit - Статус редактирования задачи
 * @param {string} editTitle - Заголовок редактируемой задачи
 * @param {string} editDescription - Описание редактируемой задачи
 * @param {string} editImage - Картинка редактируемой задачи
 * @param {function} setEditTitle - Функция изменения заголовка редактируемой задачи
 * @param {function} setEditDescription - Функция изменения описания редактируемой задачи
 * @param {function} setEditImage - Функция изменения картинки редактируемой задачи
 * @param {function} createTodo - Функция создания задачи
 * @param {function} setTitle - Функция изменения заголовка задачи
 * @param {function} setDescription - Функция изменения описания задачи
 * @param {function} setImage - Функция изменения картинки задачи
 * @param {function} setTodos - Функция изменения списка задач
 * @param {function} handleComplete - Функция завершения задачи
 * @param {function} handleEdit - Функция сохранения изменений задачи
 * @param {function} handleEditTodoClick - Функция редактирования задачи
 * @param {function} handleDelete - Функция удаления задачи
 * @returns {JSX.Element} - Возвращает разметку страницы
 * @constructor
 */


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
                createdAt: serverTimestamp(),
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
        const db = getFirestore();
        const todoDoc = doc(collection(db, "todos"), id);
        const newFields = {
            title: editTitle,
            description: editDescription,
            image: editImage
        }
        await updateDoc(todoDoc, newFields);
        setEdit(false);
    }

    const handleEditTodoClick = async (todo) => {
        setEdit(!edit);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
        setEditImage(todo.image);
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
                            onClick={() => handleEditTodoClick(todo)}
                        />
                    ))}
                </div>
            </div>
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
                            closeEdit={() => setEdit(!edit)}
                        />
                    </div>) : null
            }
            <Footer />
        </div>
    );
}
export default App;
