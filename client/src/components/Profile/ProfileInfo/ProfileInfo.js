import React from 'react'
import '../profile.scss'

export const ProfileInfo = ({ userInfo }) => {
    return (
        <div className="profile">
            <h1 className="text-3xl py-3 font-bold">Mi perfil</h1>
            <div className="profile__info">
                <p className="profile__p">Nombre: {userInfo.firstName}</p>
                <p className="profile__p">Apellido: {userInfo.lastName}</p>
                <p className="profile__p">Correo electronico: {userInfo.user}</p>
            </div>
        </div>
    )
}