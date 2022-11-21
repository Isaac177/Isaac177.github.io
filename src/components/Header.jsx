import React from 'react';
import {FcTodoList} from "react-icons/fc";
import '../App.less';


const Header = () => {
    return (
        <header className="header">
            <nav className="header__navbar">
                <div className="header__logo" onClick={() => window.location.reload()}>
                    <FcTodoList className="header__logo-icon" size={40}/>
                    <h1 className="header__logo-text">Todo List</h1>
                </div>
            </nav>
        </header>
    );
};

export default Header;