import React, { useEffect, useState } from 'react';
import './organization.scss';
import { useDropzone } from 'react-dropzone';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';

const EditOrganization = () => {
    const { register, handleSubmit } = useForm()
    const [organization, setOrganization] = useState({})

    /* Obtener el nombre nuevo */
    const handleChange = (e) => {
        e.preventDefault()
        setOrganization(e.target.value)
    }
    /*---------------------------*/

    /* Domentacion de react dropzone --------*/
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file =>
    // mostrar el nombre del archivo una vez seleccionado
    (<li key={file.path}>

        {file.path} - {file.size} bytes
    </li>
    ));
    /* ------------------------------------- */
    const fileLogo = acceptedFiles[0];

    /* Submit formulario con el nombre y el archivo del logo----------*/
    const onSubmit = (data) => {
        data = { ...data, fileLogo }
        console.log(data)
        axios.put('REACT_APP_API/backoffice/edit-organization', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    /* ---------------------------- */

    return (
        <div>

            <div className="form-container">


                <form className="form" onSubmit={handleSubmit(onSubmit)} >
                    <h1 className="form__title">Editar información de la organización</h1>

                    <label className="form__label" htmlFor="">Nombre</label>
                    <input ref={register} required name="name" onChange={handleChange} className="form__input" type="text" />

                    <label className="form__label">
                        Logo
                        </label>
                    <section className="form__file-section">
                        <div className="form__file-container" ref={register} {...getRootProps({})}>
                            <input required type="file" name="logo" {...getInputProps()} />

                            <svg className="svg-icon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>Arrastra y suelta el archivo o haz click aqui.</p>
                        </div>
                        <aside>
                            <h4>Archivo</h4>
                            <ul>{files}</ul>
                        </aside>
                    </section>

                    <button className="form__btn">Submit</button>
                    <Link className="text-gray-700 py-4" to="/">Cancelar y volver a inicio</Link>

                </form>
            </div>
        </div>
    )
}

export default EditOrganization


