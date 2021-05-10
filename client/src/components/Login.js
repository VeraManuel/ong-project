import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAxios from '../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setUser } from '../app/userSlice';
import { message } from '../Alerts';

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { send } = useAxios()
    const dispach = useDispatch();

    const inputHandler = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            message("", "Debe ingresar un mail valido.\n(Formato: ejemplo@ejemplo.com)", "info")
            e.preventDefault();
            setCredentials({
                ...credentials,
                email: ""
            })
            return
        }
        if (!/^\S{6,}$/.test(credentials.password)) {
            message("", "La contraseña debe tener al menos 6 caracteres", "info")
            e.preventDefault();
            setCredentials({
                ...credentials,
                password: ""
            })
            return
        }

        const resp = await send({ url: '/users/auth/login', method: 'post', data: credentials })
        if (!resp.data) {
            return message("", `Error en el Servidor, intente nuevamente`, "info")
        }
        if (resp.data.status === 401) {
            return message("", `Usuario o contraseña incorrecta`, "info")
        }
        if (resp.data.OK === true) {
            message("", `Bienvenido ${resp.data.firstName} ${resp.data.lastName}`, "info")
            localStorage.setItem("token", JSON.stringify(resp.data.token)); // Store token in localStorage
            let userData = {
                userId: resp.data.userId,
                user: resp.data.user,
                firstName: resp.data.firstName,
                lastName: resp.data.lastName,
                role: resp.data.role,
                image: resp.data.image,
                isAdmin: resp.data.isAdmin
            }
            dispach(setUser(userData))
            history.push("/")
        }


    };

    return (
        <form className="userForm" onSubmit={handleSubmit(onSubmit)}>
            <div class="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="userForm__heading">Iniciar Sesión</div>
                <input ref={register({
                    required: { value: true, message: 'Email requerido' },
                    pattern: { value: /^\S+@\S+$/i, message: 'Ingrese un email valido' }
                })}
                    className="userForm__input" type="text"
                    name="email" placeholder="Email"
                    onChange={(e) => inputHandler(e)} />
                {errors.email && <small className="userForm__small-text">{errors.email.message}</small>}
                <input ref={register({
                    required: { value: true, message: 'Contraseña requerida' },
                    minLength: { value: 6, message: 'La contraseña debe tener como minimo 6 caracteres' }
                })}
                    className="userForm__input" type="password"
                    name="password" placeholder="Ingrese su contraseña"
                    onChange={(e) => inputHandler(e)} />
                {errors.password && <small className="userForm__small-text">{errors.password.message}</small>}
                <button type="submit" className="userForm__submitBtn"
                    onClick={(e) => { onSubmit(e) }}>Submit</button>
                <div className="userForm__login">
                    <span>¿No tienes cuenta?</span>
                    <Link to="signup" className="userForm__link">Registrate!</Link>
                </div>
            </div>
        </form>
    )
}

export default Login