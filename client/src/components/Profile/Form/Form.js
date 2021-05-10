import React, { useState, useEffect } from 'react'
import '../profile.scss'
import * as yup from 'yup';
import axios from 'axios'
import { useHistory} from "react-router-dom";
import { setUser } from '../../../app/userSlice';
import { useDispatch } from "react-redux";
import { clearUser } from "../../../app/userSlice";

const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    user: yup.string().email().required()
})

export const Form = ({ userInfo, setuserInfo }) => {

    const [errorForm, setErrorForm] = useState(false)
    const [input, setInput] = useState(null)
    const [responseData, setResponseData] = React.useState({
        state: false,
        message: "Cargando...",
      });
 
    const dispach = useDispatch();
    const history = useHistory();
    
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: { 'Authorization': `Bearer ${token}` }
    };

    const handleInput = (e) => {
        e.preventDefault()
        setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    //add useEffect to complete the inputs
    useEffect(()=>{
        //object destructuring to get userInfo
        const {firstName, lastName, user} = userInfo;
        //set initial state
        setInput(() => ({
            firstName,
            lastName,
            user
          }));
    }, [userInfo])

    const updateUserInfo = async (event) => {
        event.preventDefault()
        const isValid = await userSchema.isValid(userInfo)

        if (isValid) {
            setErrorForm(false)
            axios
                .put(`${process.env.REACT_APP_API}/users/${userInfo.userId}`, userInfo, config)
                .then(res => {
                    dispach(setUser(userInfo))  
                })
                .then(()=>{
                    history.push("/profile")
                  })
                .catch(error => {
                    //catch and handling error
                    setResponseData({
                        state: true,
                        message: `Ha ocurrido un error ${
                            error.response ? error.response.status : 503
                        } al editar el perfil: ${
                            error.response.data.data
                            ? error.response.data.data.message
                            : error.response.data.error.msg
                        }`,
                    });
                    setTimeout(() => {
                        setResponseData({ state: false, message: "" });
                    }, 5000);  
                });
        } else {
            setErrorForm(true)
        }
    }

    const [confirmAccountDelete, setConfirmAccountDelete] = useState(false)
    const handleConfirmAccountDelete = (e) => {
        e.preventDefault();
        setConfirmAccountDelete(!confirmAccountDelete)
    }
    const handleDeleteBtn = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API}/users/${userInfo.userId}`, config)
            .then(res => {
                dispach(clearUser(null));
            })
            .catch(error => {
                //catch and handling error
                setResponseData({
                    state: true,
                    message: `Ha ocurrido un error ${
                        error.response ? error.response.status : 503
                    } al borrar el perfil: ${
                        error.response.data.data
                        ? error.response.data.data.message
                        : error.response.data.error.msg
                    }`,
                });
                setTimeout(() => {
                    setResponseData({ state: false, message: "" });
                }, 5000);
            });
    }
    return (input &&
        <div className="my-12 flex items-center justify-center">
            <div className="bg-gray-50 px-8  rounded shadow-2xl ">
                <h3 className="form__title text-3xl font-bold mb-10">Editar mi perfil</h3>
                <form className="form" onSubmit={updateUserInfo}>
                    <label htmlFor="" className="block mb-1 font-bold text-gray-500 text-left">
                        Nombre
                    </label>
                    <input 
                        onChange={handleInput}
                        required
                        name="firstName"
                        className="form__input"
                        type="text"
                        value = {input.firstName}
                        />    
                    <label htmlFor="">
                        Apellido
                    </label>
                    <input 
                        onChange={handleInput}
                        required name="lastName"
                        className="form__input"
                        type="text"
                        value = {input.lastName}
                        />
                    <label htmlFor="">
                        Correo electronico
                    </label>
                    <input 
                        onChange={handleInput}
                        required
                        name="email"
                        className="form__input"
                        type="text"
                        value = {input.user}
                        />
                    <button type="submit" className="form__btn">Confirmar</button>
                    {errorForm ? <p className="form__error-message">Verifique los campos nuevamente</p> : null}
                    <button onClick={handleConfirmAccountDelete} className="form__btn--delete">Borrar cuenta</button>
                    {confirmAccountDelete ?
                        <div className="confirmDelete">
                            <p>¿Realmente quieres borrar tu cuenta?</p>
                            <div className="confirmDelete__buttonsContainer">
                                <button onClick={handleDeleteBtn} className="form__btn-confirm-delete text-white">Confirmar</button>
                                <button onClick={handleConfirmAccountDelete} className="form__btn--delete">Cancelar</button>
                            </div>
                        </div> : null
                    }
                    {responseData.state && <p>{responseData.message}</p>}
                </form>
            </div>
        </div>
    )
}
