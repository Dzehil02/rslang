import React from 'react'; 
import SectionTitle from './SectionTitle'

function SectionsTexbook(props){
    const sectionComponens = props.section.map((item, index) => <SectionTitle key={index} group={index} title={item} handleClickSection={props.handleClickSection} />);

    
    console.log(props)
    return (
        <select className='chapter-select' name="page__chapter-book" id="page__chapter-book" onChange={(e) => props.handleClickSection(Number.parseInt(e.target.value))}>
            {sectionComponens}
        </select>
    )
}

export default SectionsTexbook;