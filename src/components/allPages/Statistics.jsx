import React from "react";
import { AuthContext } from "../context/index";
import { useState, useContext, useEffect } from "react";

const Statistics = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [learnedWordsForAllTime, setLearnedWordsAll] = useState(0);
  const [learnedWords, setLearnedWords] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [learnedWordsSprint, setLearnedWordsSprint] = useState(0);
  const [accuracySprint, setAccuracySprint] = useState(0);
  const [inRowSprint, setInRowSprint] = useState(0);
  const [learnedWordsAudio, setLearnedWordsAudio] = useState(0);
  const [accuracyAudio, setAccuracyAudio] = useState(0);
  const [inRowAudio, setInRowAudio] = useState(0);

  const runFetch = async (userId, token) => {
    let statisticsForLastGame;
    try {
      statisticsForLastGame = await getStatistics(userId, token);
      // console.log(statisticsForLastGame) показывает всю статистику пользователя
      const lastLearnedWordsSprint = statisticsForLastGame.optional?.sprintGame?.learnedWords;
      const lastLearnedWordsAudio = statisticsForLastGame.optional?.audioGame?.learnedWords;
      const lastAccuracySprint = Math.round(statisticsForLastGame.optional?.sprintGame?.accuracy);
      const lastAccuracyAudio = Math.round(statisticsForLastGame.optional?.audioGame?.accuracy);

      setLearnedWordsAll(statisticsForLastGame.learnedWords);
      setAccuracy(0);
      if (
        statisticsForLastGame.optional?.sprintGame?.date === getCurrentDate() &&
        statisticsForLastGame.optional?.audioGame?.date === getCurrentDate()
      ) {
        setLearnedWords(learnedWords + lastLearnedWordsSprint + lastLearnedWordsAudio);
        setAccuracy((accuracy + lastAccuracySprint + lastAccuracyAudio) / 2);
      } else if (statisticsForLastGame.optional?.sprintGame?.date === getCurrentDate()) {
        setLearnedWords(learnedWords + lastLearnedWordsSprint);
        setAccuracy(accuracy + lastAccuracySprint);
      } else if (statisticsForLastGame.optional?.audioGame?.date === getCurrentDate()) {
        setLearnedWords(learnedWords + lastLearnedWordsAudio);
        setAccuracy(accuracy + lastAccuracyAudio);
      } else {
        setLearnedWords(0);
        setAccuracy(0);
      }
      console.log(`Сегодняшняя дата: ${getCurrentDate()}`);

      if (statisticsForLastGame.optional?.sprintGame?.date === getCurrentDate()) {
        const lastLearnedWordsSprint = statisticsForLastGame.optional?.sprintGame?.learnedWords;
        const lastAccuracySprint = Math.round(statisticsForLastGame.optional?.sprintGame?.accuracy);
        const lastInRowSprint = statisticsForLastGame.optional?.sprintGame?.inRowCount;
        setLearnedWordsSprint(lastLearnedWordsSprint);
        setAccuracySprint(lastAccuracySprint);
        setInRowSprint(lastInRowSprint);
      } else {
        console.log("Дата sprintGame не совпала, поэтому статистика по sprintGame не выведена");
      }
      if (statisticsForLastGame.optional?.audioGame?.date === getCurrentDate()) {
        const lastLearnedWordsAudio = statisticsForLastGame.optional?.audioGame?.learnedWords;
        const lastAccuracyAudio = Math.round(statisticsForLastGame.optional?.audioGame?.accuracy);
        const lastInRowAudio = statisticsForLastGame.optional?.audioGame?.inRowCount;
        setLearnedWordsAudio(lastLearnedWordsAudio);
        setAccuracyAudio(lastAccuracyAudio);
        setInRowAudio(lastInRowAudio);
      } else {
        console.log("Дата audioGame не совпала, поэтому статистика по audioGame не выведена");
      }
    } catch {
      console.log("У пользователя нет статистики, так как он еще не играл");
    }
  };

  useEffect(() => {
    try {
      const userId = JSON.parse(localStorage.getItem("userName")).userId;
      const token = JSON.parse(localStorage.getItem("userName")).token;
      runFetch(userId, token);
    } catch {
      console.log("Пользователь не авторизован");
    }
  }, []);

  if (isAuth) {
    return (
      <main className='page'>
        <div className='page_statistics'>
          <div className='page_statistics-menu'>
            <h3 className='page_statistics-title'>Статистика</h3>
            <div className='page_statistics-day'>
              <div className='page_statistics-alltime'>
                <h4 className='page_statistics-day-title'>За все время:</h4>
                <p>Новых Слов: {learnedWordsForAllTime}</p>
              </div>
              <div className='statistics_today'>
                <h4 className='statistics_day-title'>Сегодня:</h4>
                <div className='statistics_day-words'>Новых Слов: {learnedWords}</div>
                <div className='statistics_day-answer'>Точность: {accuracy}%</div>
              </div>
            </div>
            <div className='page_statistics-game'>
              <div className='statistics_game-sprint'>
                <p>Спринт</p>
                <p>Новых Слов: {learnedWordsSprint}</p>
                <p>Точность: {accuracySprint}%</p>
                <p>В ряд: {inRowSprint}</p>
              </div>
              <div className='statistics_game-audio'>
                <p>Аудио</p>
                <p>Новых Слов: {learnedWordsAudio}</p>
                <p>Точность: {accuracyAudio}%</p>
                <p>В ряд: {inRowAudio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className='page'>
        <div className='page_statistics'>Статистика видна только авторизованным пользователям</div>
      </main>
    );
  }
};

const getStatistics = async (userId, token) => {
  const rawResponse = await fetch(
    `https://learnwords-reslang.herokuapp.com/users/${userId}/statistics`,
    {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const content = await rawResponse.json();
  return content;
};

const getCurrentDate = () => {
  return `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`;
};

export default Statistics;
