import React from "react";
import win from '../../assets/win.png';
import chap from '../../assets/chap.png';
import mer from '../../assets/mer.png';

const About = () => {
  return (
    <main className='page'>
      <div className='page__main main-block'>
        <div className='main-block__container _container'>
          <h1 className="about-team__title">О команде</h1>
          <div className="about-team__block">
            <div className="about-team__text">
            
              <img 
                className="circle" 
                src={chap} 
                alt="developer"/>

              <p>Олег, разработал дизайн сайта, подготовил макет в figma. Для проекта создал некоторые отдельные компоненты. Работал над стилями и внешним видом проекта. Настроил регистрацию и авторизацию пользователя. Создал главную страницу, страницу "О команде" и "Словарь".
              </p>
              <p><a target='blank' href='https://github.com/Dzehil02' className='menu__link'>
              Ссылка на гитхаб Олега
            </a></p>

            </div>
            <div className="about-team__text">
            
            <img 
              className="circle" 
              src={mer}
              alt="developer"/>

<p>Никита, разработал мини-игру "Спринт", где можно тренировать навык быстрого перевода с английского языка на русский. Добавил страницу "Статистика", где можно посмотреть результаты по каждой мини-игре, узнать количество новых и изученных слов.
              </p>
              <p><a target='blank' href='https://github.com/fespis' className='menu__link'>
              Ссылка на гитхаб Никиты
            </a></p>

          </div>
            <div className="about-team__text">
            
              <img 
                className="circle" 
                src={win} 
                alt="developer"/>

<p>Женя, разработал страницу "Учебник", где можно найти карточки для изучения английских слов. У каждой карточки есть транскрипция и перевод. Можно прослушать аудио с примерами использования слова. Добавить слова в сложные или изученные. Так же, Женя разработал мини-игру "Аудиовызов", где можно изучать слова тренируя восприятие речи.
              </p>
              <p><a target='blank' href='https://github.com/evgeniy37529' className='menu__link'>
              Ссылка на гитхаб Жени
            </a></p>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
