import React, { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import {isAndroid} from 'react-device-detect'
import {isEmpty} from 'lodash'


const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space]
const TagContainer = ({ tagsProps, callback, readonly, setTags, setError }) => {
  const refactored = tagsProps.map(function (t) {
    const newObj = { text: t, id: t }
    return newObj
  })

  const [suggestions, setSuggestions] = useState()
  const [tags, setNewTags] = useState(refactored)


  const validate =(input)=>{
    console.log('inout ', input)
    const regex = /^\S+$/;
    if(input.match(regex)) {
        setError('')
     return true;
    } else { 
        setError('tag may not contain spaces')
     return false; 
    }
}
  const handleDelete = (i) => {
    const tagsRemaining = tags.filter((tag, index) => index !== i)

    setNewTags(tagsRemaining)
    setTags(tagsRemaining.map((item) => item.text))
    callback(tags.map((item) => item.text))
  }

  const handleAddition = (tag) => {
    const valid = validate(tag.text)
    if(!isEmpty(tag.text) && valid){
      setNewTags((state) => [...state, tag])
      callback(tags.map((item) => item.text))
      setTags((state) => [...state, tag.text])
    }
  }

  const handleDrag = (tag, currPos, newPos) => {
    const tagsAdded = [...tags]
    const newTags = tagsAdded.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setNewTags({ tags: newTags })
    callback(tags.map((item) => item.text))
  }
  const onInputCahnge=(e)=>{
    let obj = {"id": e,"text": e}
    if(isAndroid){
      handleAddition(obj)
    }
  }

  return (
    <div>
      <ReactTags
        tags={tags}
        readOnly={readonly}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
        handleInputBlur={(e)=>onInputCahnge(e)}        
        placeholder={isAndroid ? 'to add tag click confirm' : 'add tag separated by comma or space key'}
      />
    </div>
  )
}

export default TagContainer
