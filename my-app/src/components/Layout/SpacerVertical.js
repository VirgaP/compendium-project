import React from 'react'
import bg from '../../assets/images/transparent-bg.png'

const SpacerVertical = ({width, height, display}) => {
    return (
        <div className="spacer-vertical">
            <img className={display} src={bg} width={width} />
        </div>
    )
}

export default SpacerVertical