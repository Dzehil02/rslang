import React from 'react';
import WordCard from './WordCard';

function TextbookCards (props) {
    //console.log(props.playAudio)
    const wordsComponents = props.words.map(word => <WordCard key={word.id} wordItem={word} playAudio={props.playAudio} />)
    return (
        <div className='card__body'> {/*wordsContent*/}
            
                {wordsComponents}
           
            
        </div>
    )
}

export default TextbookCards;