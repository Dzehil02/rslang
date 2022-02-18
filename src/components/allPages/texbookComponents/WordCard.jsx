/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import sound from '../../../assets/sound.svg';
import { addStyleOnPage, removeStyleOnPage } from '../TextBook'

function cutTegs(str) {
    const regex = /( |<([^>]+)>)/ig,
        result = str.replace(regex, " ");
        return result;
   }



function WordCard(props) {
   const src = 'https://learn-words-task.herokuapp.com/' + props.wordItem.image;
   const numberCardColumn = props.wordItem.image.slice(6, 13);

   function toDifficultWord (e) {
    e.target.classList.toggle('btnActiveRed')
    e.target.closest('.card__column').classList.toggle('card__column-difficult')
   }

   function toStudyWord (e) {
    e.target.classList.toggle('btnActiveBlue')
    e.target.closest('.card__column').classList.toggle('card__column-study')
    checkWords()
    }

    function checkWords () {
        let study = document.querySelectorAll('.card__column-study').length
        study > 19 ? addStyleOnPage() : removeStyleOnPage()
    }

    return (
        <div id={numberCardColumn} className="card__column" style={{backgroundImage: `url(${src})`}}>
            <div className='card__text' > 
                {<h4 className='card__word'>{props.wordItem.word} 
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.transcription}</span>
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.wordTranslate}</span>
                <button className="card__sound"><img src={sound} alt="sound" /></button>
                </h4>}

                <p className="card__meaning">{cutTegs(props.wordItem.textMeaning)}</p>
                <p className="card__example">{cutTegs(props.wordItem.textExample)}</p>
                <p className="card__meaning_rus">{props.wordItem.textMeaningTranslate}</p>
                <p className="card__example_rus">{props.wordItem.textExampleTranslate}</p>
            </div>
            <div className='card__btns'>
                <button onClick={toDifficultWord} className='card__btn card__btn-red'></button>
                <button onClick={toStudyWord} className='card__btn card__btn-blue'></button>
            </div>
        </div>
        

    )
}

export default WordCard;
