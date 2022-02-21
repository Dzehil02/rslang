import React from "react";
import arrowLeft from '../../assets/left-arrow.svg';
import arrowRight from '../../assets/right-arrow.svg';
import { getWords } from "../../API";
import SectionsTexbook from './texbookComponents/SectionsTextbook';
import TextbookCards from './texbookComponents/TextbookCards'
import Preloader from '../Preloader';
import RightArrow from './texbookComponents/RightArrow';
import LeftArrow from './texbookComponents/LeftArrow';

export function addStyleOnPage () {
   const page = document.querySelector('.page__cards')
   const numberPage = document.querySelector('.page__number-book')
   page.classList.add('card__page-study')
   if (numberPage) {
      numberPage.classList.add('card__page-study')
   }
}

export function removeStyleOnPage () {
   const page = document.querySelector('.page__cards')
   const numberPage = document.querySelector('.page__number-book')
   page.classList.remove('card__page-study')
   if (numberPage) {
      numberPage.classList.remove('card__page-study')
   }
}

class TextBook extends React.Component {
   constructor() {
      super()
      this.state = {
        loading: false,
        character: [],
        currentGroup: 0,
        currentPage: 0
      }
      this.maxPage = 30;
      this.level = ['0 - Elementary', '1 - Pre-Intermediate', '2 - Intermediate', '3 - Upper-Intermediate', '4 - Advanced', '5 - Proficiency' ]
      this.handleClickSection = this.handleClickSection.bind(this);
      this.getWords = getWords.bind(this);
      this.handleClickPageNext = this.handleClickPageNext.bind(this);
      this.handleClickPagePrev = this.handleClickPagePrev.bind(this);
      this.playAudio = this.playAudio.bind(this);
    }

    componentDidMount(){
      this.getWords(this.state.currentGroup, this.state.currentPage);
    }

   async handleClickSection(numberSection) {
      await this.setState({currentGroup: numberSection, currentPage: 0});
      await this.getWords(this.state.currentGroup, this.state.currentPage);
      
    }

   async handleClickPageNext() {
      await this.setState(prevState => {
         if(prevState.currentPage > 28){
            prevState.currentPage = 28
         }
         return {
            currentPage: prevState.currentPage + 1
         }
      });
      await this.getWords(this.state.currentGroup, this.state.currentPage);
   }

    async handleClickPagePrev() {
      await this.setState(prevState => {
          if(prevState.currentPage < 1){
            prevState.currentPage = 1
         }
         return {
            currentPage: prevState.currentPage - 1
         }
      });
      await this.getWords(this.state.currentGroup, this.state.currentPage);
    }

    playAudio(playlist){

      playlist[0].play();
      for(let i = 0; i < playlist.length; i++){
         playlist[i].addEventListener('ended', () => {
            if(playlist[i].duration === playlist[i].currentTime ){
               if(i < playlist.length - 1){
                  playlist[i + 1].play();
               }
            }else return
         })
      }
    }

   render(){
      
      return (
         <main className="page">
               <section className="page__cards">
                  <SectionsTexbook section={this.level} currentGroup={this.state.currentGroup} handleClickSection={this.handleClickSection} />
                  <div className="page__number-book">{this.state.currentPage + 1} / {this.maxPage}</div>
                  <LeftArrow image={arrowLeft} handleClickPagePrev={this.handleClickPagePrev} numberPage={this.state.currentPage}/>
                  <RightArrow image={arrowRight} handleClickPageNext={this.handleClickPageNext} numberPage={this.state.currentPage}/>
                  <div className="_container">
                     <TextbookCards words={this.state.character} playAudio={this.playAudio} />
                  </div>
               </section>
               {this.state.loading && <Preloader loading={this.loading} />}
         </main>
      );
   }
};

export default TextBook;
