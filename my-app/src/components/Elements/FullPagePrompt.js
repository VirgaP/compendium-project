import React from 'react'

const FullPagePrompt = (props) => {
    return (
        <div className={'full-page'}>
            <button className={props.btnClass} onClick={props.action}>{props.btnText}</button>
        </div>
    )
}

export default FullPagePrompt
