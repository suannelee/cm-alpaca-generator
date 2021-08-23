import React, { useState } from 'react';
import AlpacaImg from './AlpacaImg';
import PartButton from './PartButton';
import StyleButton from './StyleButton';
import { alpacaFeatures } from '../alpacaFeatures';

function CustomPanel(){
    
    const [part, setPart] = useState(0);
    const [styles, setStyles] = useState(alpacaFeatures);

    const changePart = (i) => {
        setPart(i);
    }

    const changeStyle = (i) => {
        const newStyle = styles.slice();
        newStyle[part].style.map((style) => (
            style.selected == "true"
                ? style.selected = "false" : null
        ))
        newStyle[part].style[i].selected = "true";
        setStyles(newStyle);
    }

    const renderPartButtons = () => {
        const partButtons = alpacaFeatures.map((partObj) =>
            <PartButton 
                key={partObj.partId}
                part={partObj.partId} 
                selected={part}
                onClick={() => changePart(partObj.partId)} 
            />
        )
        return(
            <div>{partButtons}</div>
        )
    }

    const renderStyleButtons = () => {
        const stylesArray = styles[part].style;

        const styleButtons = stylesArray.map((styleObj) =>
            <StyleButton 
                key={styleObj.styleId}
                part={part}
                style={styleObj.styleId}
                styles={styles}
                onClick={() => changeStyle(styleObj.styleId)}
            />
        )

        return(
            <div>{styleButtons}</div>
        )
    }

    const renderAlpaca = () => {

        const alpaca = styles.map((partObj) => (
            partObj.style.map((styleObj) => (
                styleObj.selected == "true" ?
                <AlpacaImg
                    key={styleObj.styleId}
                    part={partObj.partId}
                    style={styleObj.styleId}
                    styles={styles}
                />
                : null
            ))
        ))

        return(
            <div>{alpaca}</div>
        )
    }

    const randomizeAlpaca = () => {
        const newStyle = styles.slice();

        newStyle.map((partObj) => {

            const max = partObj.style.length;
            var rand = Math.floor(Math.random() * max);

            partObj.style.map((styleObj) => (
                styleObj.selected == "true"
                    ? styleObj.selected = "false" : null
            ))
            partObj.style[rand].selected = "true";
        })

        setStyles(newStyle);
    }

    const downloadAlpaca = () => {

        /* Combining multiple images into single canvas
        https://stackoverflow.com/a/16028008
        */
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');

        canvas.width = 500;
        canvas.height = 500;

        var alpacaImgs = document.getElementsByClassName("alpacaImg");
        for (var i = 0; i < alpacaImgs.length ; i++) {
            context.drawImage(alpacaImgs[i],0,0, 500, 500);
        }

        /* Download canvas element to an image
        https://stackoverflow.com/a/8126887
        */
        var imgFile = canvas.toDataURL("image/png");

        /* Force download image
        https://stackoverflow.com/a/21210576
        */
        var link = document.createElement('a');
        link.href = imgFile;
        link.download = 'Alpaca.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
       
    }

    return (
        <div>
            <div className="header">
                <h1>ALPACA GENERATOR</h1>
            </div>
            <div className="custom-panel">
                <div className="image">
                    <div className="image__wrapper">
                        {renderAlpaca()}
                    </div>
                    <div className="image__actions">
                        <button 
                            className="regButton active" 
                            onClick={() => randomizeAlpaca()}>
                                Randomize
                        </button>
                        <button 
                            className="regButton active"
                            onClick={() => downloadAlpaca()}>
                                Download
                        </button>
                    </div>
                </div>
                <div className="styling-panel">
                    <h3>ACCESSORIZE THE ALPACA'S</h3>
                    {renderPartButtons()}
                    <h3>STYLE</h3>
                    {renderStyleButtons()}
                </div>
            </div>
        </div>
        
    );

}
    
export default CustomPanel;