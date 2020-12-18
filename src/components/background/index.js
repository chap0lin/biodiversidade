import React from 'react'
import fundo from './fundo.png'
import './styles.css'
const Background = function(props){
    return (
        <div className="mainDiv">
            <img src={fundo} alt="" id="globo-fundo"/>
            <div class="containerDiv">
                {props.children}
            </div>
            
        </div>
    )
}
export default Background