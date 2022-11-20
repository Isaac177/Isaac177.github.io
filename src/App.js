import React, {useEffect} from 'react';
import './App.less';
import Header from "./components/Header";
import {db, storage} from "./firebase";
import {
    collection,
    onSnapshot,
    query,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage"
import SingleTodo from "./components/SingleTodo";
import CreateTodo from "./components/CreateTodo";
import dayjs from 'dayjs';



const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [completed, setCompleted] = React.useState(false);
    //const [percent, setPercent] = React.useState(0);

    const createTodo = React.useCallback(async (e) => {
        e.preventDefault();
        if (!title && !description && !image) return;
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            }
        )

        await addDoc(collection(db, 'todos'), {
            id: Math.floor(Math.random() * 100000000),
            title: title,
            description: description,
            image : await getDownloadURL(storageRef),
            completed : false,
            createdAt: new Date(),
        });
        setTitle('');
        setDescription('');
        setImage(null);
        }, [title, description, image]);

    let listOfTodos = [];

    useEffect(() => {
        const q = query(collection(db, "todos"));
        return onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                listOfTodos.push(doc.data());
            });
            setTodos(listOfTodos);
        });
    }, []);

    const handleComplete = async (todo) => {
        const todoIndex = todos.findIndex((t) => t.id === todo.id);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        setTodos(newTodos);
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: newTodos[todoIndex].completed,
        });
        console.log(newTodos[todoIndex].completed);
    }




    return (
        <div className="todo">
            <Header />
            <div className="todo__content">
                <CreateTodo
                    handleCreate={createTodo}
                    titleChange={(e) => setTitle(e.target.value)}
                    desChange={(e) => setDescription(e.target.value)}
                    imgChange={(e) => setImage(e.target.files[0])}
                />
                <div className="todo__list">
                    {todos.map((todo, index) => (
                        <SingleTodo
                            todo={todo}
                            key={index}
                            handleComplete={handleComplete}
                            handleDelete={() => {
                                deleteDoc(doc(db, 'todos', todos.id)).then(r => console.log(r));
                            }
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default App;
