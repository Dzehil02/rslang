/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import sound from '../../../assets/sound.svg';

function WordCard(props) {
   console.log(props.wordItem.textExample);
   const src = 'https://learn-words-task.herokuapp.com/' + props.wordItem.image;
    return (
        <div className="card__column" style={{backgroundImage: `url(${src})`}}>
            <div className='card__text' > {/*textbook-card*/}
                {<h4 className='card__word'>{props.wordItem.word} 
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.transcription}</span>
                <span className='card__transcription'> - </span>
                <span className='card__transcription'>{props.wordItem.wordTranslate}</span>
                <button class="card__sound"><img src={sound} alt="sound" /></button>
                </h4>}

                <p class="card__meaning">{props.wordItem.textMeaning}</p>
                <p class="card__example">{props.wordItem.textExample}</p>
                {/* <p class="card__translate">{props.wordItem.wordTranslate}</p> */}
                <p class="card__meaning_rus">{props.wordItem.textMeaningTranslate}</p>
                <p class="card__example_rus">{props.wordItem.textExampleTranslate}</p>
            </div>
        </div>
        

    )
}

export default WordCard;