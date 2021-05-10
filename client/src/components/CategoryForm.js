import React, { useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import useAxios from '../hooks/useAxios';
import "../App.scss";

const CategoryForm = ({ updCategory={} }) => {
    const { pending, send } = useAxios();
    const { register, handleSubmit, errors } = useForm();
    const [ category, setCategory ] = useState({});

    useEffect(() => {
        if(Object.keys(updCategory).length !== 0) {
            setCategory(updCategory);
        } else {
            setCategory({});
        }
    }, []);

    const submit = async (data) => {
        try {
            if(category.id) {
                const {resContent: res} = (await send({ url:`/categories/${category.id}`, method: 'put', data })).data;
                if(res.OK){
                    alert('The category has update');
                }else {
                    alert(data.msg);
                }
            }else {
                const { resContent: res } = (await send({ url: '/categories', url:'post', data })).data;
                if(res.OK){
                    alert('The category has create');
                }else {
                    alert(data.msg);
                }
            }
        }catch(e) {
            alert('Some problem, ' + e);
        }
    }

    return (
        <form className="user-edit-form" onSubmit={handleSubmit(submit)}>
            <div className="user-edit-form__item p-5">
                <h3 className="font-semibold text-lg">
                    { !category.id ? 'Crear Categoria' : 'Actualizar Categoria'}
                </h3>
            </div>

            <div className="user-edit-form__item">
                <label
                    htmlFor="name"
                    className="user-edit-form__label"
                >
                    Nombre
                </label>
                <input
                    name="name"
                    type="text"
                    defaultValue={category.name}
                    className="user-edit-form__input"
                    ref={register({required:true})}
                />
                {errors.name && <small className="msj">El nombre es requerido</small>}
            </div>

            <div className="user-edit-form__item">
                <label
                    htmlFor="description"
                    className="user-edit-form__label"
                >
                    Descripción
                </label>
                <textarea
                    name="description"
                    type="text"
                    defaultValue={category.description}
                    className="user-edit-form__input"
                    ref={register({required:true})}
                />
                {errors.description && <small className="msj">La descripción es requerida</small>}
            </div>

            <div className="user-edit-form__item button">
                <button className="user-edit-form__button" disabled={pending}>
                    { !pending ? "Enviar" : "Enviando" }
                </button>
            </div>
        </form>
    )
}

export default CategoryForm;