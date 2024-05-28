import React, {useState, useRef} from 'react'
import { useForm } from 'react-hook-form'
import { useNot } from 'react-hooks-helper'
import Header from '../../components/Header/Header'
import auth from '../../services/auth.service'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/Utils/Loader'
import eye from '../../assets/svg/eye.svg'
import eyeOff from '../../assets/svg/eye-off.svg'

const PasswordReset = (props) => {

    const query = new URLSearchParams(props.location.search);
    const token = query.get('recoverToken')
    
    const [loading, setLoading] = useState(false)
    const [show1, notShow1] = useNot(false)
    const [show2, notShow2] = useNot(false)

    const { register, errors, handleSubmit, watch } = useForm({
        mode: 'onBlur',
    })

    const password = useRef({})
    password.current = watch('password', '')

    const onSubmit = async(data) => {
        setLoading(true)
        const payload = {
            'recoverToken': token,
            'newPassword' : data.password
        }
        try {
          const response = await auth.resetPassword(payload)
          if (response.status == 200) {
            setLoading(false)
            props.history.push('/login')
         }
          if(response.status === 400){
              toast.error(response.data.error)
              setLoading(false)
          }
        } catch (error) {
          setLoading(false)
        }
      }
    return (
        <>
            <ToastContainer/>
            {loading && <Loader/>}
            <section className="auth">
            <Header title="Reset password" className={'login-header'}/>
            <form onSubmit={handleSubmit(onSubmit)} className="form-default">
                <div className="input-group input-with-icon">
                    <input
                        id="password"
                        name="password"
                        required
                        placeholder="password"
                        ref={register({
                        required: 'required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 charecters long',
                        },
                        })}
                        type={show1 ? 'text' : 'password'}
                    />
                    <i className="icon" onClick={notShow1} aria-hidden="true">
                        {show1 ? (
                        <img src={eyeOff} alt="user icon" />
                        ) : (
                        <img src={eye} alt="user icon" />
                        )}
                    </i>
                </div>
                {errors.password && (
                <span role="alert" className="error">{errors.password.message}</span>
                )}
                <div className="input-group input-with-icon">
                    <input
                        id="password_repeat"
                        name="password_repeat"
                        type={show2 ? 'text' : 'password'}
                        placeholder="repeat password"
                        ref={register({
                        validate: (value) =>
                            value === password.current || 'The passwords do not match',
                        })}
                    />
                    <i className="icon" onClick={notShow2} aria-hidden="true">
                        {show2 ? (
                        <img src={eyeOff} alt="user icon" />
                        ) : (
                        <img src={eye} alt="user icon" />
                        )}
                    </i>
                </div>
                {errors.password_repeat && <span className="error">{errors.password_repeat.message}</span>}
        
            <div className="center center half-width mx-auto pt-2">
              <button className="btn-secondary" type="submit">
                submit
              </button>
            </div>
          </form>
        </section>
        </>
    )
}

export default PasswordReset
