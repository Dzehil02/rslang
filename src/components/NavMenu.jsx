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
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  //useEffect(() => setShowLeftMenu(false), []);
  useEffect(() => document.addEventListener('click' , (e) => {
    if(showLeftMenu && !e.target.classList.contains('menu_burger') && !e.target.classList.contains('menu-line')) setShowLeftMenu(false);
  }))
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
  }, [isAuth, setIsAuth])

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
         
          <div className='menu_burger' onClick={() => setShowLeftMenu(prev => !prev)}>
            <span className='menu-line'></span>
            <span className='menu-line'></span>
            <span className='menu-line'></span>
          </div>
          <Link to='/' className='header__logo'>
            <span className='rs-logo'>RS</span> lang
          </Link>
          {/* -------------------------Mobile menu------------------------------------------------- */}
          <nav className='left__menu menu' style={{transform : showLeftMenu && 'translate(0)'}}>
            <ul className='left__menu__list'>
              <li className='left__menu__item'>
                <Link to='/' className='menu__link'>
                  Главная
                </Link>
              </li>
              <li className='left__menu__item'>
                <Link to='/textbook' className='menu__link'>
                  Учебник
                </Link>
              </li>
              <li className='left__menu__item'>
                <Link to='/sprintgame' className='menu__link'>
                  Спринт
                </Link>
              </li>
              <li className='left__menu__item'>
                <Link to='/audiogame' className='menu__link'>
                  Аудиовызов
                </Link>
              </li>
              <li className='left__menu__item'>
                <Link to='/statistics' className='menu__link'>
                  Статистика
                </Link>
              </li>
              {dictionary && <li className='left__menu__item'>
                <Link to='/dictionary' className='menu__link'>
                {dictionary}
                </Link>
              </li>}
              <li className='left__menu__item'>
                <Link to='/about' className='menu__link'>
                  О команде
                </Link>
              </li>
            </ul>
          </nav>
          {/* ------------------------------------------------------------------------- */}
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
          <div className='main-block_auth'>
            <Button nameButton={nameBtn} link={loginLink} onClick={changeBtn} />
            <div className="login-block__text">{nickName}</div>
          </div>
        </div>

        
      </header>
   );
};

export default NavMenu;
