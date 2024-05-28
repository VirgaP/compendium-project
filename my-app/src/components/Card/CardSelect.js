import React, {useState} from 'react'
import Select from "react-select";
import Spinner from '../Utils/Spinner'
import Image from '../Form/Image'
import func from '../../utils/functions'
import userIcon from '../../assets/svg/user-white.svg'

const CardSelect = (props) => {
    const data = props.props.pagesData
    const loading = props.props.isLoading
    
    // if(loading){
    //     return  <div className="profile__modal_cardlist-container"><Spinner/></div>
    // }

    function handleChange(selection) {
        props.callback(selection.value)
    } 

    const options = 
        data.map((option) => ({
            value: option.id,
            label: option.name,
            type: option.type,
            avatar: <div className="modal-avatar-wrapper"><Image url ={option.profilePhotoURL || userIcon} className={`${!option.profilePhotoURL ? `default-avatar ${func.typeToColor(option.type)}` : `modal-avatar ${func.typeToColor(option.type)}`} `}/></div> 
        }))
    
    
    const formatOptionLabel = ({ value, label, avatar }) => (
        <div style={{ display: "flex", flexFlow:"row",  justifyContent: "flex-start", textAlign:"left", alignItems: "center", width:"100%", height: "50px"  }}>
            <div style={{ marginRight: "10px"}}>
            {avatar}
            </div>
            <div className="font-l font-normal">{label}</div>
        </div>
    )
    return (
        <div className="profile__modal-cardlist-container">
            {data.length > 0
            ? 
            <Select
                placeholder="Select page"
                // defaultValue={options[0]}
                formatOptionLabel={formatOptionLabel}
                options={options}
                getOptionValue={option => option}
                classNamePrefix={'modal'}
                onChange={(option)=>{handleChange(option)}}
            />
            : <div className="rte center">It appears you don't have any pages yet</div>
        }
        </div>
    )
}

export default CardSelect
