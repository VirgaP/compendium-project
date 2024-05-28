import React, { Children, isValidElement, cloneElement } from 'react'
import { useForm } from 'react-hook-form'
import style from '../../assets/scss/elements/_form.scss'

const Form = ({ className, children, action, preloadedValues }) => {
  const { register, errors, watch, handleSubmit } = useForm({
    defaultValues: preloadedValues,
    mode: 'all',
  })
  const onSubmit = () => action()

  const props = { children, register, errors, watch, onSubmit }

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { props })
    }
    return child
  })

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <>{childrenWithProps}</>
    </form>
  )
}

export default Form
