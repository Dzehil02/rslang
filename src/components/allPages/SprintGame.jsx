import React from "react";
import { useState, useEffect, useContext } from "react";
import soundTrue from "../../assets/trueAnswer.mp3";
import soundFalse from "../../assets/falseAnswer.mp3";
import { AuthContext } from "../context/index";
import { getStatistics, putStatistics } from "../../API";

const SprintGame = () => {
  const [page, setPage] = useState(true);
  const [complexity, setСomplexity] = useState(0);
  const [words, setWords] = useState(GetWords(getRandomNumber(0, 30), complexity));

  let updatePage = (value) => {
    setPage({ name: value });
  };
  let updateСomplexity = (value) => {
    setСomplexity(value);
  };
  let updateWords = (value) => {
    setWords(value);
  };

  return (
    <main className='page'>
      {page === true ? (
        <SprintGameChoose
          updatePage={updatePage}
          updateСomplexity={updateСomplexity}
          updateWords={updateWords}
        />
      ) : (
        <SprintGameStart words={words} updateWords={updateWords} />
      )}
    </main>
  );
};

let GetWords = (page, group) => {
  let words = [];
  fetch(`https://learnwords-reslang.herokuapp.com/words?page=${page}&group=${group}`)
    .then((response) => response.json())
    .then((commits) => commits.map((item) => words.push(item)));
  return words;
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const SprintGameChoose = ({ updatePage, updateСomplexity, updateWords }) => {
  let refLevelGame = React.createRef();

  let handlerPage = () => {
    updatePage(false);
  };

  let handlerСomplexity = () => {
    updateСomplexity(refLevelGame.current.value);
    updateWords(GetWords(getRandomNumber(0, 30), refLevelGame.current.value));
  };

  return (
    <div className='page__sprint'>
      <div className='sprint__choose'>
        <h2 className='sprint__choose-title'>Спринт</h2>
        <p className='sprint__choose-text'>
          Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать
          соответствует ли перевод предложенному слову.
        </p>
        <div className='sprint__choose-buttons'>
          <select className='sprint__choose-select' ref={refLevelGame} onChange={handlerСomplexity}>
            <option value='0'>Уровень 1</option>
            <option value='1'>Уровень 2</option>
            <option value='2'>Уровень 3</option>
            <option value='3'>Уровень 4</option>
            <option value='4'>Уровень 5</option>
            <option value='5'>Уровень 6</option>
          </select>
          <button className='sprint__choose-button' onClick={handlerPage}>
            Начать
          </button>
        </div>
      </div>
    </div>
  );
};

const SprintGameStart = ({ words, updateWords }) => {
  const timeForAnswer = 60;
  const [seconds, setSeconds] = useState(timeForAnswer);
  const [randomTranslate, setRandomTranslate] = useState(getRandomNumber(0, words.length));
  const [randomTrueOrFalse, setTrueOrFalse] = useState(getRandomNumber(0, 2));
  const [trueTranslate, setTrueTranslate] = useState([]);
  const [falseTranslate, setFalseTranslate] = useState([]);
  const [countRightAnswers, setCountRightAnswers] = useState(0);
  const [countInRowCurrent, setCountInRowCurrent] = useState(0);
  const [countInRowForAllGame, setCountInRowForAllGame] = useState(0);

  let time = Timer(seconds, setSeconds);
  let refEnglishWord = React.createRef();
  let refRussianWord = React.createRef();

  const inRowChange = (trueOrFalseWord) => {
    if (trueOrFalseWord) {
      setCountRightAnswers((prevCount) => prevCount + 1);
      let count = countRightAnswers + 1;
      if (count >= 3) {
        count = 3;
        let rowCurrent = countInRowCurrent + 1;
        let rowForAllTime = countInRowForAllGame;
        setCountInRowCurrent(rowCurrent);
        if (rowCurrent > rowForAllTime) setCountInRowForAllGame(rowCurrent);
      }
    }
    if (!trueOrFalseWord) {
      let count = 0;
      setCountRightAnswers(count);
      setCountInRowCurrent(count);
    }
  };

  const rightButton = () => {
    const englishWord = words[0].wordTranslate;
    const russianWord = refRussianWord.current.textContent;
    if (englishWord === russianWord) {
      trueTranslate.push(words[0]);
      audioAnswer(soundFalse);
      inRowChange(true);
    } else {
      falseTranslate.push(words[0]);
      audioAnswer(soundTrue);
      inRowChange(false);
    }
    changeArrayWord();
  };

  const wrongButton = () => {
    const englishWord = words[0].wordTranslate;
    const russianWord = refRussianWord.current.textContent;
    if (englishWord === russianWord) {
      falseTranslate.push(words[0]);
      audioAnswer(soundTrue);
      inRowChange(false);
    } else {
      trueTranslate.push(words[0]);
      audioAnswer(soundFalse);
      inRowChange(true);
    }
    changeArrayWord();
  };

  const changeArrayWord = () => {
    words.shift();
    updateWords(words);
    setRandomTranslate(getRandomNumber(0, words.length));
    setTrueOrFalse(getRandomNumber(0, 2));
    if (words.length === 0) setSeconds(0);
  };

  const wordSound = () => {
    let audio = new Audio(`https://learnwords-reslang.herokuapp.com/${words[0].audio}`);
    audio.play();
  };

  if (time === 0) {
    return (
      <SprintGameResult
        trueTranslate={trueTranslate}
        falseTranslate={falseTranslate}
        countInRowForAllGame={countInRowForAllGame}
      />
    );
  } else {
    return (
      <div className='page__sprint'>
        <div className='sprint__start'>
          <div className='sprint__start-timer'>Осталось: {time}</div>
          <ul className='sprint__start-row'>
            <li className={countRightAnswers >= 1 ? "start__row-right" : "start__row"}></li>
            <li className={countRightAnswers >= 2 ? "start__row-right" : "start__row"}></li>
            <li className={countRightAnswers >= 3 ? "start__row-right" : "start__row"}></li>
          </ul>
          <div>В ряд: {countInRowForAllGame}</div>
          <div className='sprint__start-result'>Правильно: {trueTranslate.length}</div>
          <div className='sprint__start-english' ref={refEnglishWord}>
            {words[0].word}
          </div>
          <div className='sprint__start-russian' ref={refRussianWord}>
            {randomTrueOrFalse === 0
              ? words[0].wordTranslate
              : words[randomTranslate].wordTranslate}
          </div>
          <button className='sprint__start-audio' onClick={wordSound}>
            Прослушать
          </button>
          <div className='sprint__start-translate'>
            <button
              className='start__translate start__translate-false'
              onClick={wrongButton}
              onKeyDown={wrongButton}
            >
              Неверно
            </button>
            <button
              className='start__translate start__translate-true'
              onClick={rightButton}
              onKeyDown={rightButton}
            >
              Верно
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const audioAnswer = (trueOrFalseAnswer) => {
  let audio = new Audio(trueOrFalseAnswer);
  audio.play();
};

let Timer = (seconds, setSeconds) => {
  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds((c) => c - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [seconds]);

  return seconds;
};

const getCurrentDate = () => {
  return `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`;
};

const SprintGameResult = ({ trueTranslate, falseTranslate, countInRowForAllGame }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const runFetch = async () => {
    if (isAuth) {
      const userId = JSON.parse(localStorage.getItem("userName")).userId;
      const token = JSON.parse(localStorage.getItem("userName")).token;
      let statisticsForLastGame;
      let body;
      try {
        statisticsForLastGame = await getStatistics(userId, token);
        const lastDateSprint = statisticsForLastGame.optional.sprintGame.date;
        const lastLearnedWords = statisticsForLastGame.learnedWords;
        if (getCurrentDate() === lastDateSprint) {
          const lastLearnedWords = statisticsForLastGame.learnedWords;
          const lastLearnedWordsSprint = statisticsForLastGame.optional.sprintGame.learnedWords;
          const lastAccuracySprint = statisticsForLastGame.optional.sprintGame.accuracy;
          const lastInRowSprint = statisticsForLastGame.optional.sprintGame.inRowCount;
          body = userWithLastStatistics(
            lastLearnedWords,
            lastLearnedWordsSprint,
            lastAccuracySprint,
            lastDateSprint,
            lastInRowSprint,
            trueTranslate,
            falseTranslate,
            countInRowForAllGame,
            statisticsForLastGame,
            "audioGame"
          );
        } else {
          body = userStatisticsForNewDay(
            lastLearnedWords,
            trueTranslate,
            falseTranslate,
            countInRowForAllGame,
            statisticsForLastGame,
            "audioGame"
          );
        }
      } catch {
        body = newUserStatistics(
          trueTranslate,
          falseTranslate,
          countInRowForAllGame,
          statisticsForLastGame,
          "audioGame"
        );
      }
      await putStatistics(userId, token, body);
    }
  };

  useEffect(() => {
    runFetch();
  }, []);

  const wordSound = (item) => {
    let audio = new Audio(`https://learnwords-reslang.herokuapp.com/${item.audio}`);
    audio.play();
  };

  return (
    <div className='page__sprint'>
      <div className='sprint__result'>
        <div className='sprint__result-title'>Правилные ответы:</div>
        <ul>
          {trueTranslate.map((item, index) => (
            <li key={index.toString()}>
              {item.word} : {item.wordTranslate} : {item.transcription}
              <img
                src='/static/media/sound.ba8123dfd9564e88b7f6e93739af2f0e.svg'
                alt='play'
                className='sprint__result-soundplay'
                onClick={() => {
                  wordSound(item);
                }}
              ></img>
            </li>
          ))}
        </ul>
        <div className='sprint__result-title'>Неправилные ответы:</div>
        <ul>
          {falseTranslate.map((item, index) => (
            <li key={index.toString()}>
              {item.word} : {item.wordTranslate} : {item.transcription}
              <img
                src='/static/media/sound.ba8123dfd9564e88b7f6e93739af2f0e.svg'
                alt='play'
                className='sprint__result-soundplay'
                onClick={() => {
                  wordSound(item);
                }}
              ></img>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const newUserStatistics = (
  trueTranslate,
  falseTranslate,
  countInRowForAllGame,
  statisticsForLastGame,
  otherGame
) => {
  return {
    learnedWords: trueTranslate.length,
    optional: {
      sprintGame: {
        learnedWords: trueTranslate.length,
        accuracy: (trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100,
        date: getCurrentDate(),
        inRowCount: countInRowForAllGame,
      },
      audioGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
    },
  };
};

const userStatisticsForNewDay = (
  lastLearnedWords,
  trueTranslate,
  falseTranslate,
  countInRowForAllGame,
  statisticsForLastGame,
  otherGame
) => {
  return {
    learnedWords: lastLearnedWords + trueTranslate.length,
    optional: {
      sprintGame: {
        learnedWords: trueTranslate.length,
        accuracy: (trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100,
        date: getCurrentDate(),
        inRowCount: countInRowForAllGame,
      },
      audioGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
    },
  };
};

const userWithLastStatistics = (
  lastLearnedWords,
  lastLearnedWordsSprint,
  lastAccuracySprint,
  lastDateSprint,
  lastInRowSprint,
  trueTranslate,
  falseTranslate,
  countInRowForAllGame,
  statisticsForLastGame,
  otherGame
) => {
  return {
    learnedWords: lastLearnedWords + trueTranslate.length,
    optional: {
      sprintGame: {
        learnedWords: trueTranslate.length + lastLearnedWordsSprint,
        accuracy:
          ((trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100 +
            lastAccuracySprint) /
          2,
        date: lastDateSprint,
        inRowCount: lastInRowSprint > countInRowForAllGame ? lastInRowSprint : countInRowForAllGame,
      },
      audioGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
    },
  };
};

const checkIsStatisticsOtherGame = (statisticsForLastGame, someGame) => {
  if (statisticsForLastGame?.optional?.[someGame] === undefined) {
    console.log(`Добавлена нулевая статистика по ${someGame}`);
    return {
      learnedWords: 0,
      accuracy: 0,
      date: 0,
      inRowCount: 0,
    };
  } else {
    console.log(`Добавлена предыдущая статистика по ${someGame}`);
    const lastLearnedWordsAudio = statisticsForLastGame.optional?.[someGame].learnedWords;
    const lastAccuracyAudio = statisticsForLastGame.optional?.[someGame].accuracy;
    const lastInRowAudio = statisticsForLastGame.optional?.[someGame].inRowCount;
    const lastDate = statisticsForLastGame.optional?.[someGame].date;
    return {
      learnedWords: lastLearnedWordsAudio,
      accuracy: lastAccuracyAudio,
      date: lastDate,
      inRowCount: lastInRowAudio,
    };
  }
};
export default SprintGame;
