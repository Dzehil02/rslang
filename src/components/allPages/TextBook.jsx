import React from "react";
import arrowLeft from '../../assets/left-arrow.svg';
import arrowRight from '../../assets/right-arrow.svg';
import { getWords } from "../../API";
import SectionsTexbook from './texbookComponents/SectionsTextbook';
import TextbookCards from './texbookComponents/TextbookCards'

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
    }

    componentDidMount(){
      this.getWords(this.state.currentGroup);
    }

    async handleClickSection(numberSection) {
      await this.setState({currentGroup: numberSection});
      await this.getWords(this.state.currentGroup);
    }

   render(){
      return (
         <main className="page">
              <section className="page__cards">
              <SectionsTexbook section={this.level} currentGroup={this.state.currentGroup} handleClickSection={this.handleClickSection} />
                 <div className="page__number-book">11</div>
                 <div className="page__left-arrow"><img src={arrowLeft} alt="left-arrow"/></div>
                 <div className="page__right-arrow"><img src={arrowRight} alt="right-arrow"/></div>
                 <div className="_container">
                 <TextbookCards currentGroup={this.state.currentGroup}   words={this.state.character} />
                 </div>
              </section>
           </main>
       );
   }
  
};

export default TextBook;
