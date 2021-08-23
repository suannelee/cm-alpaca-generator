import React from 'react';

const StyleButton = ({ part, style, styles, onClick }) => {

    const partObj = styles[part];
    const partType = partObj.partName;
    const styleBtn = partObj.style[style];
    const styleName = styleBtn.styleName;
    const isSelected = styleBtn.selected === "true" ? "active" : "";
    
    return(
        <button 
            className={`
                ${partType === "Backgrounds" ? "bgButton" : "regButton"} 
                ${isSelected}
            `} 
            style={{backgroundColor: partType === "Backgrounds" ? styleName : ""}}
            onClick={onClick}>
            {partType === "Backgrounds" ? "" : styleName}
        </button>
    )
}
    

export default StyleButton;