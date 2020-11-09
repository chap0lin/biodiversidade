import React from 'react'

import './styles.css'
const Background = function(props){
    return (
        <div className="mainDiv">
            {props.children}
        </div>
    )
}
export default Background