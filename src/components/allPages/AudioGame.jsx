/* eslint-disable default-case */
import React, { useState, useEffect, useCallback, useContext } from "react";
import srcPlayImage from "../../assets/music-svgrepo.svg";
import srcPlaySvg from "../../assets/sound.svg";
import { AuthContext } from "../context/index";
import { getStatistics, putStatistics } from "../../API";

const AudioGame = () => {
  const [page, setPage] = useState(true);
  const [complexity, setСomplexity] = useState(0);
  const [words, setWords] = useState(GetWords(getRandomNumber(0, 30), complexity));

  let updatePage = (value) => {
    setPage(value);
  };
  let updateСomplexity = (value) => {
    setСomplexity(value);
  };
  let updateWords = (value) => {
    setWords(value);
  };

  return (
    <main className='page audio-game'>
      {page === true ? (
        <AudioGameChoose
          updatePage={updatePage}
          updateСomplexity={updateСomplexity}
          updateWords={updateWords}
        />
      ) : (
        <AudioGameStart updatePage={updatePage} words={words} updateWords={updateWords} />
      )}
    </main>
  );
};

export default AudioGame;

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

function randomSort(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const AudioGameChoose = ({ updatePage, updateСomplexity, updateWords }) => {
  let refLevelGame = React.createRef();

  let handlerPage = () => {
    updatePage(false);
  };

  let handlerСomplexity = () => {
    updateСomplexity(refLevelGame.current.value);
    updateWords(GetWords(getRandomNumber(0, 30), refLevelGame.current.value));
  };
  //if(refLevelGame.current.value) console.log(refLevelGame.current.value);
  //console.log(refLevelGame.current.value);
  useEffect(() => handlerСomplexity(), []);
  return (
    <div className='page__audiogame'>
      <div className='audiogame__choose'>
        <h2 className='audiogame__choose-title'>Аудиовызов</h2>
        <p className='audiogame__choose-text'>
          Выберите из предложенных вариантов ответа правильный перевод слова, который услышите
        </p>
        <div className='audiogame__choose-buttons'>
          <select
            className='audiogame__choose-select'
            ref={refLevelGame}
            onChange={handlerСomplexity}
          >
            <option value='0'>Уровень 1</option>
            <option value='1'>Уровень 2</option>
            <option value='2'>Уровень 3</option>
            <option value='3'>Уровень 4</option>
            <option value='4'>Уровень 5</option>
            <option value='5'>Уровень 6</option>
          </select>
          <button className='audiogame__choose-button' onClick={handlerPage}>
            Начать
          </button>
        </div>
      </div>
    </div>
  );
};

const AudioGameStart = ({ words, updatePage }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(true);
  const [nextWord, setNextWord] = useState(true);
  const [randomAnswerWord, setRandomAnswers] = useState(
    randomSort([...getRandom(words, 3), words[currentWord]])
  );
  const [trueAnswers, setTrueAnswers] = useState([]);
  const [falseAnswers, setFalseAnswers] = useState([]);
  const [limitForResult, setLimitForResult] = useState(0);
  const [disabledBtnAnswer, setDisabledBtnAnswers] = useState(true);
  const [countRightAnswers, setCountRightAnswers] = useState(0);
  const [countInRowCurrent, setCountInRowCurrent] = useState(0);
  const [countInRowForAllGame, setCountInRowForAllGame] = useState(0);

  useEffect(
    () => setRandomAnswers(randomSort([...getRandom(words, 3), words[currentWord]])),
    [currentWord]
  );

  function getRandom(arr, n) {
    if (arr) {
      var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
      if (n > len) throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
        var x = Math.floor(Math.random() * len);
        if (arr[x in taken ? taken[x] : x].word !== words[currentWord].word) {
          result[n] = arr[x in taken ? taken[x] : x];
        } else {
          result[n] = arr[Math.floor(Math.random() * len)];
        }
        taken[x] = --len;
      }
      return result;
    }
  }

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

  function handleCorrectAnswerClick(e) {
    if (isCorrectAnswer) {
      if (e.target.innerHTML === words[currentWord].word) {
        e.target.style.backgroundColor = "green";
        console.log("yes");
      } else if (e.target.innerHTML !== words[currentWord].word) {
        e.target.style.backgroundColor = "red";
        console.log("no");
      }
    }
    setIsCorrectAnswer(false);
  }

  useEffect(() => playWord(), [currentWord]);

  const playWord = () => {
    const srcAudio = "https://learn-words-task.herokuapp.com/" + words[currentWord].audio;
    new Audio(srcAudio).play();
  };
  useEffect(() => setNextWord(true), [currentWord]);

  const handleNextWord = useCallback(() => {
    setCurrentWord((prev) => {
      if (prev > 18) {
        prev = 18;
      }
      return prev + 1;
    });
    setLimitForResult((prev) => prev + 1);
    setNextWord(true);
    setDisabledBtnAnswers((prev) => !prev);
  }, [currentWord]);

  const answersWordsCpmponents = randomAnswerWord.map((item, index) => (
    <Button
      key={index}
      setTrueAnswers={setTrueAnswers}
      setFalseAnswers={setFalseAnswers}
      nextWord={nextWord}
      setNextWord={setNextWord}
      correctAnswer={words[currentWord]}
      onClick={handleCorrectAnswerClick}
      words={item}
      inRowChange={inRowChange}
    />
  ));

  return (
    <div
      className='audiogame_contentgame'
      style={{ display: limitForResult > words.length && "block" }}
    >
      {/* <span className='audiogame_exit' onClick={() => updatePage(true)} >&times;</span> */}
      {limitForResult < words.length ? (
        <>
          <span className='audiogame_exit' onClick={() => updatePage(true)}>
            &times;
          </span>
          <QuestionWord play={playWord} />
          <div className='audioGame_answers-btn'>{answersWordsCpmponents}</div>
          <button
            className={
              nextWord ? "audiogame_nextword" : "audiogame_nextword audiogame_nextword-active"
            }
            disabled={nextWord}
            onClick={handleNextWord}
          >
            Следущее слово
          </button>
        </>
      ) : (
        <ResultAudioGame
          result={{ trueAnswers, falseAnswers, countInRowForAllGame }}
          updatePage={updatePage}
        />
      )}
    </div>
  );
};

export const Button = ({
  words,
  correctAnswer,
  setNextWord,
  setFalseAnswers,
  setTrueAnswers,
  inRowChange,
}) => {
  const [selected, setSelected] = useState(false);
  const [btns, setBtn] = useState(document.querySelectorAll(".audio-answer"));

  useEffect(() => setSelected(false), [words.word]);
  useEffect(() => {
    setBtn(document.querySelectorAll(".audio-answer"));
    btns.forEach((item) => {
      item.disabled = false;
      item.classList.remove("audiogame_disabled-answer");
    });
  }, [words.word]);

  const onClickHandler = useCallback(
    (e) => {
      if (e.target && e.target.innerHTML === correctAnswer.word) {
        inRowChange(true);
      } else if (e.target && e.target.innerHTML !== correctAnswer.word) {
        inRowChange(false);
      }
      if (e.target && e.target.innerHTML === correctAnswer.word)
        setTrueAnswers((prev) => [...prev, correctAnswer]);
      else if (e.target && e.target.innerHTML !== correctAnswer.word)
        setFalseAnswers((prev) => [...prev, correctAnswer]);
      setSelected((prev) => !prev);
      const btns = document.querySelectorAll(".audio-answer");
      btns.forEach((item) => {
        item.disabled = true;
        item.classList.add("audiogame_disabled-answer");
      });
      setNextWord(false);
    },
    [correctAnswer]
  );

  const toggleStyles = useCallback(() => {
    if (selected && words.word !== correctAnswer.word) {
      return { backgroundColor: "red" };
    }
    if (selected && words.word === correctAnswer.word) {
      return { backgroundColor: "green" };
    }
  }, [selected]);

  return (
    <button className='audio-answer' onClick={onClickHandler} style={toggleStyles()}>
      {words.word}
    </button>
  );
};

const QuestionWord = ({ play }) => {
  return (
    <div className='audiogame_play-word' onClick={play}>
      <img src={srcPlayImage} width='80' alt='play word' />
    </div>
  );
};

const ResultAudioGame = ({ result, updatePage, countInRowForAllGame }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const handleClickToBegin = () => {
    updatePage(true);
  };

  const runFetch = async () => {
    if (isAuth) {
      const userId = JSON.parse(localStorage.getItem("userName")).userId;
      const token = JSON.parse(localStorage.getItem("userName")).token;
      let statisticsForLastGame;
      let body;
      try {
        statisticsForLastGame = await getStatistics(userId, token);
        const lastDateAudio = statisticsForLastGame.optional.audioGame.date;
        const lastLearnedWords = statisticsForLastGame.learnedWords;
        if (getCurrentDate() === lastDateAudio) {
          const lastLearnedWords = statisticsForLastGame.learnedWords;
          const lastLearnedWordsAudio = statisticsForLastGame.optional.audioGame.learnedWords;
          const lastAccuracyAudio = statisticsForLastGame.optional.audioGame.accuracy;
          const lastInRowAudio = statisticsForLastGame.optional.audioGame.inRowCount;
          body = userWithLastStatistics(
            lastLearnedWords,
            lastLearnedWordsAudio,
            lastAccuracyAudio,
            lastDateAudio,
            lastInRowAudio,
            result.trueAnswers,
            result.falseAnswers,
            result.countInRowForAllGame,
            statisticsForLastGame,
            "sprintGame"
          );
        } else {
          body = userStatisticsForNewDay(
            lastLearnedWords,
            result.trueAnswers,
            result.falseAnswers,
            result.countInRowForAllGame,
            statisticsForLastGame,
            "sprintGame"
          );
        }
      } catch {
        body = newUserStatistics(
          result.trueAnswers,
          result.falseAnswers,
          result.countInRowForAllGame,
          statisticsForLastGame,
          "sprintGame"
        );
      }
      await putStatistics(userId, token, body);
    }
  };

  useEffect(() => {
    runFetch();
  }, []);

  const srcAudio = "https://learn-words-task.herokuapp.com/";

  const trueAnswersComponents = result.trueAnswers.map(
    ({ id, word, transcription, wordTranslate, audio }) => {
      return (
        <li key={id} className='audiogame_answer-item'>
          {word}&nbsp; - &nbsp;
          <span>{transcription}</span>&nbsp; - &nbsp;
          {wordTranslate}
          <img
            className='audiogame_play-resultword'
            src={srcPlaySvg}
            alt='play'
            onClick={() => new Audio(srcAudio + audio).play()}
          />
        </li>
      );
    }
  );

  const falseAnswersComponents = result.falseAnswers.map(
    ({ id, word, transcription, wordTranslate, audio }) => {
      return (
        <li key={id} className='audiogame_answer-item'>
          {word} &nbsp;- &nbsp;
          <span>{transcription}</span> &nbsp; - &nbsp;
          {wordTranslate}
          <img
            className='audiogame_play-resultword'
            src={srcPlaySvg}
            alt='play'
            onClick={() => new Audio(srcAudio + audio).play()}
          />
        </li>
      );
    }
  );

  return (
    <div className='audiogame_result'>
      <div className='audiogame_result-content'>
        <div className='audiogame_true-result'>
          <h3 className='audiogame_result-title'>Правильные ответы</h3>
          <ul>
            {trueAnswersComponents.length ? (
              trueAnswersComponents
            ) : (
              <p className='audiogame_result-alltrue'>Вам стоит подучить слова :)</p>
            )}
          </ul>
        </div>
        <div className='audiogame_false-result'>
          <h3 className='audiogame_result-title'>Неправильные ответы</h3>
          <ul>
            {falseAnswersComponents.length ? (
              falseAnswersComponents
            ) : (
              <p className='audiogame_result-alltrue'>Все ответы верны! Вы молодец!!!</p>
            )}
          </ul>
        </div>
      </div>
      <button className='audiogame_gobegin' onClick={handleClickToBegin}>
        Назад к игре
      </button>
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
      audioGame: {
        learnedWords: trueTranslate.length,
        accuracy: (trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100,
        date: getCurrentDate(),
        inRowCount: countInRowForAllGame,
      },
      sprintGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
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
      audioGame: {
        learnedWords: trueTranslate.length,
        accuracy: (trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100,
        date: getCurrentDate(),
        inRowCount: countInRowForAllGame,
      },
      sprintGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
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
      audioGame: {
        learnedWords: trueTranslate.length + lastLearnedWordsSprint,
        accuracy:
          ((trueTranslate.length / (trueTranslate.length + falseTranslate.length)) * 100 +
            lastAccuracySprint) /
          2,
        date: lastDateSprint,
        inRowCount: lastInRowSprint > countInRowForAllGame ? lastInRowSprint : countInRowForAllGame,
      },
      sprintGame: checkIsStatisticsOtherGame(statisticsForLastGame, otherGame),
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

const getCurrentDate = () => {
  return `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`;
};
