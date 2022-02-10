import React from 'react';

function SectionTitle(props){

    return (
        // eslint-disable-next-line no-undef
        <option data-level={props.group}>{props.title}</option>
    )
}

export default SectionTitle;