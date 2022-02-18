/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import sound from '../../../assets/sound.svg';

function cutTegs(str) {
    const regex = /( |<([^>]+)>)/ig,
        result = str.replace(regex, " ");
        return result;
   }

function WordCard(props) {
    const audioList = [
                        'https://learn-words-task.herokuapp.com/' + props.wordItem.audio, 
                        'https://learn-words-task.herokuapp.com/' + props.wordItem.audioMeaning,
                        'https://learn-words-task.herokuapp.com/' + props.wordItem.audioExample
                    ];
    const audio = audioList.map(item => new Audio(item));
   const src = 'https://learn-words-task.herokuapp.com/' + props.wordItem.image;

    return (
        <div className="card__column" style={{backgroundImage: `url(${src})`}}>
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
        </div>
        

    )
}

export default WordCard;
