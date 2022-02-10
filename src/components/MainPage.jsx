import React from "react";
import Button from "./Button";

const MainPage = () => {
  return (
    <main className='page'>
      <div className='page__main main-block'>
        <div className='main-block__container _container'>
          <div className='main-block__body'>
            <h1 className='main-block__title'>Прокачай свой уровень английского</h1>
            <div className='main-block__text'>
              На сайте ты найдёшь 3600 слов для изучения под разный уровень. Запоминай слова в
              интересном и удобном для тебя формате. Чего же ты ждёшь? Начни прямо сейчас!
            </div>
            <div className='main-block__buttons'>
              <Button nameButton='Начать спринт' link='/sprintgame' />
              <Button nameButton='Аудиовызов' link='/audiogame'/>
            </div>
          </div>
        </div>
        <div className='main-block__image _ibg'>
          <img src={require("../assets/British.png")} alt='cover'></img>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
