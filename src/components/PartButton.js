import React from 'react';
import { alpacaFeatures } from '../alpacaFeatures';

const PartButton = ({ part, selected, onClick }) => {
    const partBtn = alpacaFeatures[part].partName;
    const isSelected = selected === part ? "active" : "";

    return(
        <button 
            className={`${isSelected} regButton`}
            onClick={onClick}>
            {partBtn}
        </button>
    )
}

export default PartButton;