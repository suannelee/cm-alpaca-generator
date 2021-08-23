import React from 'react';

const AlpacaImg = ({ part, style, styles }) => {

    const folder = styles[part].folder;
    const file = styles[part].style[style].file;
    const altName = styles[part].style[style].styleName;  
    const className = "image__" + folder;

    return(
        /*  Require() module 
        https://stackoverflow.com/a/59075858  
        */
        <img 
            className={`${className} alpacaImg`}
            src={require(`../alpaca/${folder}/${file}`).default}
            alt={altName}
        />
        
    )

}

export default AlpacaImg;
