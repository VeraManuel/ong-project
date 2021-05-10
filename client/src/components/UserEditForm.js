import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";
// import { confirm } from "../Alerts";
import "../App.scss";

export default function UserEditForm({ id }) {
    const { register, handleSubmit, errors } = useForm();
    const { send } = useAxios();
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            const userLogged = JSON.parse(atob(token.split(".")[1])).sub;
            setRole(userLogged.roleId);
            if(!id) {
                setUser(userLogged);
            }else {
                setUser(await send({ url: `/users/${id}` })); //this route does not exist
            }
        })();
    }, []);

    const onSubmit = async (formVals) => {
        // confirm("Esta seguro que quiere actualizar el usuario");TODO: correctly adapt Swal
        try{
            const resp = (await send({ url: `/users/${1}`, method: 'put', data: formVals })).data;
            if(resp.resContent.OK) {
                alert(`El usuario ${resp.resContent.data.user.firstName} fue actualizado`);
            } else {
                alert(resp.resContent.data.msg); //Shoud redirect for any route.
            }
        }catch(e) {
            alert(e);
        }
    };

    return (
        <>
            <form className="user-edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="user-edit-form__item">
                  <h3>Formulario de edicion de usuarios</h3>
                </div>
                <div className="user-edit-form__item">
                    <label
                        htmlFor="firstName"
                        className="user-edit-form__label"
                    >
                        Nombre
                    </label>
                    <input
                        name="firstName"
                        type="text"
                        defaultValue={user?.firstName}
                        className="user-edit-form__input"
                        ref={register({required:true})}
                    />
                    {errors.firstName && <small className="msj">El Nombre es requerido</small>}
                </div>

                <div className="user-edit-form__item">
                    <label htmlFor="lastName" className="user-edit-form__label">
                        Apellido
                    </label>
                    <input
                        name="lastName"
                        type="text"
                        defaultValue={user?.lastName}
                        className="user-edit-form__input"
                        ref={register({required:true})}
                    />
                    {errors.lastName && <small className="msj">El Apellido es requerido</small>}
                </div>

                <div className="user-edit-form__item">
                    <label htmlFor="rol" className="user-edit-form__label">
                        Rol
                    </label>
                    <select
                        name="roleId"
                        defaultValue={role}
                        className="user-edit-form__select"
                        ref={register({required:true})}
                    >
                        {role === 1 && (
                            <option value="1">Administrador</option>
                        )}
                        <option value="2">Usuario</option>
                    </select>
                </div>
                <div className="user-edit-form__item button">
                  <button className="user-edit-form__button">Actualizar</button>
                </div>
            </form>
        </>
    );
}
