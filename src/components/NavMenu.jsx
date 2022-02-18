import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const NavMenu = () => {
   return (
      <header className='header'>
        <div className='header__container _container'>
          <Link to='/' className='header__logo'>
            <span className='rs-logo'>RS</span> lang
          </Link>
          <nav className='header__menu menu'>
            <ul className='menu__list'>
              <li className='menu__item'>
                <Link to='/' className='menu__link'>
                  Главная
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/textbook' className='menu__link'>
                  Учебник
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/sprintgame' className='menu__link'>
                  Спринт
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/audiogame' className='menu__link'>
                  Аудиовызов
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/statistics' className='menu__link'>
                  Статистика
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/about' className='menu__link'>
                  О команде
                </Link>
              </li>
            </ul>
          </nav>
          <Button nameButton='Войти' link='/login' />
        </div>
      </header>
   );
};

export default NavMenu;
