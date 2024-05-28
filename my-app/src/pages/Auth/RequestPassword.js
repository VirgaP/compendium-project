import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import Header from '../../components/Header/Header'
import auth from '../../services/auth.service'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/Utils/Loader'

const RequestPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const { register, errors, handleSubmit } = useForm({
        mode: 'onBlur',
      })

    const onSubmit = async() => {
        setLoading(true)
        try {
          const response = await auth.requestPasswordReset(email)
          if (response.status == 200) {
            toast.success('check your email!')
            setLoading(false)
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
            <Header title="Forgot your password?" className={'login-header'} subheading={'enter the email you registered with and we will send you new password'}/>
            <form onSubmit={handleSubmit(onSubmit)} className="form-default pb-2">
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
            </div>
            {errors.email && <span className="error" role="alert">{errors.email.message}</span>}
            {errors.email && errors.email.type === 'required' && (
              <div className="error">Please enter your email</div>
            )}
            <div className="center">
              <button className="btn-secondary login__btn pt-1 mt-2" type="submit">
                submit
              </button>
            </div>
          </form>
        </section>
        </>
    )
}

export default RequestPassword
