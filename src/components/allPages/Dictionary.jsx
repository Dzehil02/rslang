import React, { useState } from "react";
import { getUserWords, getWordId } from "../../API";
import { loadJSON } from "./Login";
import TextbookCards from "./texbookComponents/TextbookCards";

const hardWord = [
  {
    "id": "5e9f5ee35eb9e72bc21af4a3",
    "group": 0,
    "page": 0,
    "word": "arrive",
    "image": "files/01_0003.jpg",
    "audio": "files/01_0003.mp3",
    "audioMeaning": "files/01_0003_meaning.mp3",
    "audioExample": "files/01_0003_example.mp3",
    "textMeaning": "To <i>arrive</i> is to get somewhere.",
    "textExample": "They <b>arrived</b> at school at 7 a.m.",
    "transcription": "[əráiv]",
    "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
    "textMeaningTranslate": "Приехать значит попасть куда-то",
    "wordTranslate": "прибыть"
  },
  {
    "id": "5e9f5ee35eb9e72bc21af4af",
    "group": 0,
    "page": 0,
    "word": "typical",
    "image": "files/01_0016.jpg",
    "audio": "files/01_0016.mp3",
    "audioMeaning": "files/01_0016_meaning.mp3",
    "audioExample": "files/01_0016_example.mp3",
    "textMeaning": "If something is <i>typical</i>, it is normal, or something that usually happens.",
    "textExample": "My <b>typical</b> breakfast is toast and eggs.",
    "transcription": "[típikəl]",
    "textExampleTranslate": "Мой типичный завтрак - тост и яйца",
    "textMeaningTranslate": "Если что-то типичное, это нормально, или что-то, что обычно происходит",
    "wordTranslate": "типичный"
  }
]

const learnWord = [
  {
    "id": "5e9f5ee35eb9e72bc21af4a6",
    "group": 0,
    "page": 0,
    "word": "camera",
    "image": "files/01_0007.jpg",
    "audio": "files/01_0007.mp3",
    "audioMeaning": "files/01_0007_meaning.mp3",
    "audioExample": "files/01_0007_example.mp3",
    "textMeaning": "A <i>camera</i> is a piece of equipment that takes pictures.",
    "textExample": "I brought my <b>camera</b> on my vacation.",
    "transcription": "[kǽmərə]",
    "textExampleTranslate": "Я принес свою камеру в отпуск",
    "textMeaningTranslate": "Камера - это часть оборудования, которая делает снимки",
    "wordTranslate": "камера"
  }
]

const Dictionary = () => {

  const [chapter, setChapter] = useState([]);

  const getDifficultWords = () => {
    const titleOne = document.querySelectorAll('.words__title')[0]
    const titleTwo = document.querySelectorAll('.words__title')[1]
    titleOne.classList.add('words__title_1')
    titleTwo.classList.remove('words__title_2')
    getUserAllWordsForDif();
  }

  const getLearnedWords = () => {
    const titleOne = document.querySelectorAll('.words__title')[0]
    const titleTwo = document.querySelectorAll('.words__title')[1]
    titleOne.classList.remove('words__title_1')
    titleTwo.classList.add('words__title_2')
    getUserAllWordsForLearn();
  }

  const getUserAllWordsForLearn = async () => {
    const user = loadJSON('userName')
    const allWords = await getUserWords({
      userId: user.userId,
      token:  user.token
    })
    makeCards(filterCardsByLearn(allWords));
  }

  const getUserAllWordsForDif = async () => {
    const user = loadJSON('userName')
    const allWords = await getUserWords({
      userId: user.userId,
      token:  user.token
    })
    makeCards(filterCardsByDifficult(allWords));
  }
  
  const filterCardsByLearn = (allWords) => {
    return allWords.filter(item => item.optional.learn)
  }

  const filterCardsByDifficult = (allWords) => {
    return allWords.filter(item => !item.optional.learn)
  }

  const makeCards = async (all) => {

  const allId = all.map(item => item.wordId)

  const anAsyncFunction = async item => {
  return getWordId(item)
  }
  
  const getData = async () => {
  return Promise.all(allId.map(item => anAsyncFunction(item)))
  }

  getData().then(data => {
    setChapter(data)
    })
  }
  

  return (

<main className='page'>
  <section className="page__cards">
    <div className='_container'>
      <div className="word__wrapper">
       
        <button 
        onClick={getDifficultWords} 
        className="words__btn">
        <h2 className="words__title">Сложные слова</h2>
        </button>

        <button 
        onClick={getLearnedWords} 
        className="words__btn">
        <h2 className="words__title">Изученные слова</h2>
        </button>

      </div>

      <div>
        <TextbookCards words={chapter} />
      </div>
    </div>
  </section>
</main>
  );
};

export default Dictionary;
