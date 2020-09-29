import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}
const Header:React.FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src='https://img2.freepng.ru/20180412/tae/kisspng-computer-icons-service-mark-symbol-logo-trademark-dot-5ad008be402cd9.9401964215235831662629.jpg' />
            <div className={s.login}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }

            </div>
        </header>)
}

export default Header;