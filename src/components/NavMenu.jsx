import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { AuthContext } from "./context";

const NavMenu = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [nameBtn, setNameBtn] = useState('Войти')
  const [loginLink, setLoginLink] = useState('/login')
  const [nickName, setNickName] = useState('')
  const [dictionary, setDictionary] = useState('')

  useEffect( () => {
    if (localStorage.getItem('userName')) setIsAuth(true)
    if(isAuth) {
      const nick = localStorage.getItem('nickName');
      setNickName(nick.slice(1, nick.length - 1))
      setLoginLink(null)
      setNameBtn('Выйти')
      setDictionary('Словарь')
    } else {
      setLoginLink('/login')
      setNameBtn('Войти')
      setNickName('')
      setDictionary('')
    }
  }, [isAuth])

  function changeBtn() {
    if (isAuth) {
      localStorage.removeItem('userName')
      localStorage.removeItem('nickName')
      setIsAuth(false)
    } 
  }

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
                <Link to='/dictionary' className='menu__link'>
                {dictionary}
                </Link>
              </li>
              <li className='menu__item'>
                <Link to='/about' className='menu__link'>
                  О команде
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Button nameButton={nameBtn} link={loginLink} onClick={changeBtn} />
            <div className="login-block__text">{nickName}</div>
          </div>
        </div>
      </header>
   );
};

export default NavMenu;
