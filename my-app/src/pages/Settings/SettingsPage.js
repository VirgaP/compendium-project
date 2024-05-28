import React, {useState, useEffect, useRef} from 'react'
import { useNot } from 'react-hooks-helper'
import { useForm } from 'react-hook-form'
import { Modal } from 'react-responsive-modal'
import { ToastContainer, toast } from 'react-toastify'
import MainContainer from '../../components/Layout/MainContainer'
import Header from '../../components/Header/Header'
import { useAuthState } from '../../context'
import Loader from '../../components/Utils/Loader'
import hook from '../../utils/hook'
import func from '../../utils/functions'
import auth from '../../services/auth.service'

import eye from '../../assets/svg/eye.svg'
import eyeOff from '../../assets/svg/eye-off.svg'


const SettingsPage = (props) => {

    const [userDetails, setUser] = useState({})
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("") 
    const [open, setOpen] = useState(false)


    const [editName, setEditName] = useNot(false)
    const [editEmail, setEditEmail] = useNot(false)
    
    const [show, notShow] = useNot(false)
    const [show1, notShow1] = useNot(false)
    const [show2, notShow2] = useNot(false)

    const [loading] = hook.useAxiosLoader()

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))


    const onOpenModal = () => setOpen(true)
    const onCloseModal = () => setOpen(false)

    const { register, watch, errors, handleSubmit } = useForm({
        mode: 'onBlur',
      })

    const onSubmit = async (data) => {

        let newPassword = data.password
        let oldPassword = data.old_password
        let payload = { newPassword, oldPassword}

        console.log(payload)
        try {
          const response = await auth.changePassword(payload)    
          if (response.status === 200) {
            toast.success('Password updated')
          }
          if(response.status===400){
              toast.error(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      const password = useRef({})
      password.current = watch('password', '')
    

    useEffect(() => {
        const currentUSer = func.getCurrentUser()
        async function fetchData() {
            const request = await auth.getUserByUUID(currentUSer.uuid)
            if(request.status !==400){
                setUser(request)
            }
        }
        fetchData()
    }, [])

    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const submitEmailChange =async()=>{
        try {
            const response = await auth.updateUser({email})
            if (response.data.id) {
                setEmail(false)
                setUser(userDetails.email)
            }
          } catch (error) {
            console.log(error)
          }

    } 

    const submitNameChange =async(e)=>{
        try {
            const response = await auth.updateUser({username})
            if (response.status===200) {
                setEditName(false)
                setUser(userDetails.username)
            }
          } catch (error) {
            console.log(error)
          }
    }

    const handleAccountDelete = async()=>{
        try {
            const response = await auth.deleteAccount()
            if (response.status === 200) {
                localStorage.removeItem('currentUser')
                localStorage.removeItem('userPages')
                props.history.push('/')
            }
          } catch (error) {
            console.log(error)
          }
    }

    return (
        <>
        <ToastContainer/>
        <Modal open={open} onClose={onCloseModal} center>
             <Header 
                title={'Delete account?'}
                subheading={'Your pages and events will be lost forever.'}
            />
            <button className="btn-secondary half-width" onClick={handleAccountDelete}>delete</button>
        </Modal>
        {loading && <Loader/>}
        <MainContainer>
            <div className="page__container">
                <section className="settings py-2">
                    <h3 className="my-2">Account settings</h3>
                    {!editName ? 
                    <div className="input-group py-2"><label>username</label>
                    <input className="no-border" type="text" name="username"  defaultValue={userDetails.username} readOnly/>
                    <i className="icon" onClick={setEditName} aria-hidden="true">change</i></div>
                    :<form onSubmit={submitNameChange} className="input-group py-2">
                    <label>username</label><input type="text" name="username" value={username} onChange={handleNameChange} required />
                    <button className="icon btn-no-style" type="submit">save</button></form>
                    }  
                   {currentUser.registrationMethod === "local" &&
                    <>
                    {!editEmail ? 
                    <div className="input-group py-2"><label>email</label>
                    <input className="no-border" type="text" name="email"  defaultValue={userDetails.email} readOnly/>
                    <i className="icon" onClick={setEditEmail} aria-hidden="true">change</i></div>
                    :<form onSubmit={submitEmailChange} className="input-group py-2">
                    <label>email</label><input type="text" name="username" value={email} onChange={handleEmailChange} required />
                    <button className="icon btn-no-style" type="submit">save</button></form>
                    } 
                    </>
                    }
                    {currentUser.registrationMethod === "local" && <form onSubmit={handleSubmit(onSubmit)} className="form-default mt-2">
                    <div>
                    <div className="font-l pb-2">change password</div>    
                    <div className="input-group input-with-icon">
                    <input
                        id="old_password"
                        name="old_password"
                        required
                        placeholder="old password"
                        ref={register({
                        required: 'required'
                        })}
                        type={show ? 'text' : 'password'}
                    />
                    <i className="icon" onClick={notShow} aria-hidden="true">
                        {show ? (
                        <img src={eyeOff} alt="user icon" />
                        ) : (
                        <img src={eye} alt="user icon" />
                        )}
                    </i>
                    </div>
                    <div className="input-group input-with-icon">
                    <input
                        id="password"
                        name="password"
                        required
                        placeholder="new password"
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
                        placeholder="repeat new password"
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
                    </div>  
                    <button className="btn-secondary mt-2" type="submit">change password</button>                                 
                    </form>}
                </section>
                <div onClick={onOpenModal} className="font-l bolder my-2 cursor-p">delete account</div>
            </div>
           
        </MainContainer>
        </>
    )
}

export default SettingsPage
