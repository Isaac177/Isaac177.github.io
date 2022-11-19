import React, {useEffect} from 'react';
import './App.less';
import Header from "./components/Header";
import Input from "./components/Input";
import {db} from "./firebase";
import {collection, onSnapshot, query} from "firebase/firestore";
import SingleTodo from "./components/SingleTodo";
import {log} from "@craco/craco/dist/lib/logger";


const App = () => {
    const [todos, setTodos] = React.useState([]);

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

    console.log(todos);

    return (
        <div className="todo">
            <Header />
            <div className="todo__content">
                <Input />
                <div className="todo__list">
                    {todos.map((todo) => (
                        <SingleTodo
                            todo={todo}
                            key={todo.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default App;
