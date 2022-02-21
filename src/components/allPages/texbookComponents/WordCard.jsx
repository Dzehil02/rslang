/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect } from 'react';
import sound from '../../../assets/sound.svg';
import { addStyleOnPage, removeStyleOnPage } from '../TextBook'
import deleteBtn from '../../../assets/delete.svg'
import { createUserWord, getUserWord, getUserWords, removeUserWord, removeWordId } from '../../../API';
import { AuthContext } from '../../context';
import { loadJSON } from '../Login';

function cutTegs(str) {
    const regex = /( |<([^>]+)>)/ig,
        result = str.replace(regex, " ");
        return result;
   }

function WordCard(props) {

    const BtnToWord = () => {
        const {isAuth} = useContext(AuthContext);
        if(isAuth) {
            return (
            <>
            {document.location.pathname === '/textbook' 
                ? <div className='card__btns'>
                    <button onClick={toDifficultWord} className='card__btn card__btn-red'></button>
                    <button onClick={toStudyWord} className='card__btn card__btn-blue'></button>
                </div>
                :   <div className='card__btns'>
                <button onClick={removeWord} className='card__btn-del'><img src={deleteBtn} alt="remove" /></button>
                    </div>
                }
            </>
        )
        } else {
            return null
        }
    }

    const audioList = [
        'https://learn-words-task.herokuapp.com/' + props.wordItem.audio, 
        'https://learn-words-task.herokuapp.com/' + props.wordItem.audioMeaning,
        'https://learn-words-task.herokuapp.com/' + props.wordItem.audioExample
    ];

    const audio = audioList.map(item => new Audio(item));
    const src = 'https://learn-words-task.herokuapp.com/' + props.wordItem.image;
    const numberCardColumn = props.wordItem.image.slice(6, 13);
    
   function toDifficultWord (e) {
    const checkWordInList = e.target.closest('.card__column').classList.contains('card__column-difficult')
    if (checkWordInList) {
        return
    }
    e.target.classList.add('btnActiveRed')
    e.target.closest('.card__column').classList.add('card__column-difficult')
    const user = loadJSON('userName')
    createUserWord({
    userId: user.userId,
    wordId: props.wordItem.id,
    token:  user.token,
    word: { "difficulty": props.wordItem.word, "optional": {learn: false} }
    })
   }

   function toStudyWord (e) {
    const checkWordInList = e.target.closest('.card__column').classList.contains('card__column-study')
    if (checkWordInList) {
        return
    }
    e.target.classList.add('btnActiveBlue')
    e.target.closest('.card__column').classList.add('card__column-study')
    const user = loadJSON('userName')
    createUserWord({
    userId: user.userId,
    wordId: props.wordItem.id,
    token:  user.token,
    word: { "difficulty": props.wordItem.word, "optional": {learn: true} }
    })
    checkWords()
    }

    function removeWord (e) {
        e.target.closest('.card__column').classList.add('hide__card')
        const user = loadJSON('userName')

        removeUserWord({
            userId: user.userId,
            wordId: props.wordItem.id,
            token:  user.token
        })
        
    }

    // function poluchit () {
    //     const user = loadJSON('userName')
    //     console.log(props.wordItem.word)
    //     getUserWord({
    //         userId: user.userId,
    //         wordId: props.wordItem.id,
    //         token:  user.token
    //     })
    // }

    function checkWords () {
        let study = document.querySelectorAll('.card__column-study').length
        study > 19 ? addStyleOnPage() : removeStyleOnPage()
    }

    return (
        <div id={numberCardColumn} className="card__column" style={{backgroundImage: `url(${src})`}}>
            {/* <button onClick={poluchit}>GETWORD</button> */}
            <div className='card__text' > 
                {<h4 className='card__word'>{props.wordItem.word} 
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.transcription}</span>
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.wordTranslate}</span>
                <button className="card__sound" onClick={() => props.playAudio(audio)}><img src={sound} alt="sound" /></button>
                </h4>}

                <p className="card__meaning">{cutTegs(props.wordItem.textMeaning)}</p>
                <p className="card__example">{cutTegs(props.wordItem.textExample)}</p>
                <p className="card__meaning_rus">{props.wordItem.textMeaningTranslate}</p>
                <p className="card__example_rus">{props.wordItem.textExampleTranslate}</p>
            </div>
            <BtnToWord />
        </div>
        

    )
}

export default WordCard;
