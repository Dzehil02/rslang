import React from 'react';
import WordCard from './WordCard';

function TextbookCards (props) {

    const wordsComponents = props.words.map(word => <WordCard key={word.id} wordItem={word} playAudio={props.playAudio} />)

    return (
        <div className='card__body'> 
            {wordsComponents}
        </div>
    )
}

export default TextbookCards;
