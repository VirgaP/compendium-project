import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import Header from '../Header/Header'
import auth from '../../services/auth.service'
import logo from '../../assets/svg/logo-no-text.svg'
import { toast, ToastContainer } from 'react-toastify'

const RequestInviteForm = () => {
    const { register, watch, errors, handleSubmit } = useForm({
        mode: 'all',
      })

    const [formData, setFormData] = useState({email: '', name: '', description: '', link:''})
    
    const onSubmit=async()=>{
        console.log(formData)
        try {
            const request = await auth.requestInvite(formData)      
            if (request.status === 201) {
                toast('Request sent')
                setTimeout(function(){ window.location.replace('/explore') }, 2000)
            }
          } catch (error) {
            console.log(error)
          }
    }
    return (
        <>
        <ToastContainer/>
        <section className="auth">
           <Header icon={logo} title="Request Invitation to Arttice platform"/>
          <form onSubmit={handleSubmit(onSubmit)} className="form-default pb-2-sm">
            <div className="input-group">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="name"
                ref={register({
                  required: 'required',
                  minLength: {
                    value: 2,
                    message: 'name must be least 2 charecters long',
                  },
                })}
                onChange={e => setFormData({...formData,name: e.target.value})}
              />
            </div>
            {errors.name && <span className="error" role="alert">{errors.name.message}</span>}
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="email"
                required
                ref={register({
                  required: true,
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'please enter a valid email',
                  },
                })}
                onChange={e => setFormData({...formData,email: e.target.value})}
              />
            </div>
            {errors.email && <span className="error" role="alert">{errors.email.message}</span>}
            <div className="input-group">
              <input
                id="description"
                name="description"
                type="text"
                ref={register({
                    required: 'required',
                    minLength: {
                      value: 10,
                      message: 'description must be at least 10 charecters long',
                    },
                  })}
                required
                placeholder="short description"
                onChange={e => setFormData({...formData,description: e.target.value})}
                />
            </div>
            {errors.description && <span className="error" role="alert">{errors.description.message}</span>}
            <div className="input-group">
              <input
                id="link"
                name="link"
                type="text"
                ref={register({
                    required: 'required',
                    pattern: {
                        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
                        message: 'please enter a valid link',
                      },
                  })}
                placeholder="link to your website, social media, etc."
                onChange={e => setFormData({...formData,link: e.target.value})}
              />
            </div>
            {errors.link && <span className="error" role="alert">{errors.link.message}</span>}

            <div className="center center full-width mx-auto pt-2 pb-2-sm">
              <button className="btn-secondary" type="submit">
                submit
              </button>
            </div>
          </form>
       </section>
       </>
    )
}
export default  RequestInviteForm