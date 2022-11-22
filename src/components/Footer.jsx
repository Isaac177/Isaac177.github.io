import React from 'react';
import dayjs from "dayjs";



/**
 * @returns {JSX.Element} - возвращает JSX элемент
 */

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__container-text">
                    <p className="footer__text">© {dayjs().format('YYYY')} - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;