import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Categories from '../Admin/ActivityForm'


const BackOffice = () => {
    const {user} = useSelector((state)=>state.user)
    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div className='bg-blue-400 text-left shadow-lg '>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <div className='bg-indigo-900 text-left  shadow-lg w-60'>
                    {   user.isAdmin &&
                        <>   
                        <Link to='/backoffice/novedades' className="navbar__link block w-full whitespace-nowrap text-white mr-8">Novedades</Link>
                        <Link to='/backoffice/activities' className="navbar__link block w-full whitespace-nowrap text-white">Actividades</Link>
                        <Link to='/backoffice/users' className="navbar__link block w-full whitespace-nowrap text-white">Usuarios</Link>
                        <Link to='/backoffice/contactos' className="navbar__link block w-full whitespace-nowrap text-white">Contactos</Link>
                        <Link to='/backoffice/edit-organization' className="navbar__link block w-full whitespace-nowrap text-white">Editar Organizacion</Link>
                        <Link to='/backoffice/new-post' className="navbar__link block w-full whitespace-nowrap text-white">Crear Post</Link>
                        <Link to='/backoffice/edit-post' className="navbar__link block w-full whitespace-nowrap text-white">Editar Post</Link>
                        <Link to='/backoffice/new-activities' className="navbar__link block w-full whitespace-nowrap text-white">Crear Actividad</Link>
                        <Link to='/backoffice/edit-activities' className="navbar__link block w-full whitespace-nowrap text-white">Editar Actividad</Link>
                        <Link to='/backoffice/new-testimonials' className="navbar__link block w-full whitespace-nowrap text-white">Crear Testimonios</Link>
                        <Link to='/backoffice/testimonials' className="navbar__link block w-full whitespace-nowrap text-white">Testimonios</Link>
                        <Link to='/backoffice/new-category' className="navbar__link block w-full whitespace-nowrap text-white">Crear Categoria</Link>
                        <Link to='/backoffice/edit-category' className="navbar__link block whitespace-nowrap text-white">Editar Categoria</Link>
                        <Link to='/backoffice/category' className="navbar__link block w-full whitespace-nowrap text-white">Categoria</Link>
                        </>
                    }
                </div>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <Categories/>
                </div>
            </div>
        </div>
    )
}

export default BackOffice
