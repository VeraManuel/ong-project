import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSchema } from "../validations/UserValidations";
import useAxios from '../hooks/useAxios';
import {useDispatch} from 'react-redux';
import {setUser} from '../app/userSlice';
import { message } from '../Alerts';


function RegisterForm() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UserSchema),
  });
  const history = useHistory();
  const {send} =useAxios()
  const dispach = useDispatch();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e)=>{
    if (credentials.firstName === "" ||
        credentials.firstName === " " ||
        credentials.lastName === "" ||
        credentials.lastName === " "){
          message("", "Ingrese el Nombre y/o Apellido", "info")
          return
        }


    if (!/\S+@\S+\.\S+/.test(credentials.email)){
      message("", "Debe ingresar un mail valido.\n(Formato: ejemplo@ejemplo.com)", "info")
      e.preventDefault();
      setCredentials({
          ...credentials,
          email:""
      })
    return
    }
    if(!/^\S{6,}$/.test(credentials.password)){
      message("", "La contraseña debe tener al menos 6 caracteres", "info")
      e.preventDefault();
      setCredentials({
          ...credentials,
          password:""
      })
        return
  }
    e.preventDefault();

    const resp = await send({url:'/users/auth/register',method:'post',data:credentials})    
    console.log(resp)
    if (!resp.data){
           return message("", `Error en el Servidor, intente nuevamente`, "info")
        }
    if (resp.data.OK===false){
        if(resp.data.error.param==="email"){
            return message("", `Error: Email Invalido`, "info")       
        }
        if(resp.data.error[0].param==="password"){
          return message("", "Error: El password debe tener mas de 6  caracteres", "info")           
        }
        if(resp.data.error[0].param==="firstName"||resp.data.error[0].param==="lastName"){
          return message("", "Error: El nombre o el apellido no pueden estar vacio o contener carateres especiales", "info")             
        }
        if(resp.data.error==="El usuario ya a sido registrado"){
          return message("", `${resp.data.error}`, "info")             
        }
     }
         message("", `Bienvenido ${resp.data.firstName} ${resp.data.lastName}.\nSu cuenta ha sido creada exitosamente.`, "info") 
         let userData = {
          userId:resp.data.userId,
          user:resp.data.user,
          firstName:resp.data.firstName,
          lastName:resp.data.lastName,
          role:resp.data.role,
          image:resp.data.image,
          isAdmin:resp.data.isAdmin
      }
         dispach(setUser(userData))
         localStorage.setItem("token", JSON.stringify(resp.data.token)); // Store token in localStorage
         history.push("/")  
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userForm">
      <div class="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="userForm__heading">Regístrate para continuar</div>
          <div className="userForm__input-name">
            <input
              ref={register}
              className="userForm__input"
              type="text"
              name="firstName"
              placeholder="Nombre"
              onChange={(e) => inputHandler(e)}
            />
            {errors.name && (
              <small class="userForm__small-text">{errors.name.message}</small>
            )}
          </div>
          <div className="userForm__input-name">
            <input
              ref={register}
              className="userForm__input"
              type="text"
              name="lastName"
              placeholder="Apellido"
              onChange={(e) => inputHandler(e)}
            />
            {errors.lastName && (
              <small class="userForm__small-text">
                {errors.lastName.message}
              </small>
            )}
          </div>
        <input
          ref={register}
          className="userForm__input"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => inputHandler(e)}
        />
        {errors.email && (
          <small class="userForm__small-text">{errors.email.message}</small>
        )}
        <input
          ref={register}
          className="userForm__input"
          type="password"
          name="password"
          placeholder="Crea tu contraseña"
          onChange={(e) => inputHandler(e)}
        />
        {errors.password && (
          <small class="userForm__small-text">{errors.password.message}</small>
        )}
        <button
          type="submit"
          className="userForm__submitBtn"
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </button>
        <div className="userForm__login">
          <span>Ya tenes una cuenta?</span>
          <Link to="/signin" className="userForm__link">
            Ingresar
          </Link>
        </div>
      </div>  
    </form>
  );
}

export default RegisterForm;
