import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//schema to validate input
const schema = yup.object().shape({
    contentText: yup.string().min(20, 'Ingresar un texto de minimo 20 caracteres'),
    textImg1: yup.string(),
    textImg2: yup.string(),
    textImg3: yup.string()
  });


const FormEditHome = () => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    //Initial state, include textarea value
    const [ contentText, setContentText ] = useState("");
    //Inistial state, array object with img and text  
    const [listSlide, setListSlide] = useState([]);
    //Initial state object img+text
    const [objectSlide , setObjectSlider ] = useState({})
    
    
    //submit form
    const onSubmit = ( data, e ) =>{
        console.log(data)
        //reset form
        e.target.reset();
    }
  
    return ( 
       <div className="container mx-auto lg:px-12 text-xs md:text-sm">
           <form
                onSubmit={handleSubmit(onSubmit)}
                className="text-left py-10"
           >
                <label className="text-lg font-medium">Nuevo Contenido:</label>
                <textarea 
                    ref={register}
                    className="w-full border-2 
                        border-gray-200 focus:outline-none 
                        focus:border-blue-300 p-2
                        mt-2
                    "  
                    name="contentText" 
                    rows="5" type="text" 
                    id="contentText"  
                    placeholder="Ingresa aqui el nuevo contenido..."
                />
                {errors.contentText && <small className="userForm__small-text">{errors.contentText.message}</small>}
                
                <div className="w-full mt-4">
                    <label className="text-sm md:text-base block pb-4 font-medium">Ingresar Primera imagen:</label>
                    <div className="space-y-5">
                    <input
                        ref={register} 
                        type="file" 
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full" 
                        id="first" 
                        name="URLImg1" 
                        accept=" image/jpg,
                        image/jpeg,
                        image/gif,
                        image/png"
                    />
                    {errors.URLImg && <small className="userForm__small-text">{errors.URLImg.message}</small>}
                    <input
                        ref={register} 
                        type="text" 
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full" 
                        name="textImg1" 
                        placeholder="Texto de la imagen" 
                    />
                    {errors.textImg && <small className="userForm__small-text">{errors.textImg.message}</small>}
                    </div>
                </div>
                
                <div className="w-full mt-4">
                    <label className="text-sm md:text-base block pb-4 font-medium">Ingresar Segunda imagen:</label>
                    <div className="space-y-5">
                    <input 
                        ref={register}
                        type="file" 
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full" 
                        id="second" 
                        name="URLImg2" 
                        accept=" image/jpg,
                        image/jpeg,
                        image/gif,
                        image/png"
                    />
                    {errors.URLImg && <small className="userForm__small-text">{errors.URLImg.message}</small>}
                    <input 
                        ref={register}
                        type="text" 
                        className="form__input"  
                        name="textImg2" 
                        placeholder="Texto de la imagen"
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full"  
                    />
                    {errors.textImg && <small className="userForm__small-text">{errors.textImg.message}</small>}
                    </div> 
                </div>
                
                <div className="w-full mt-4">
                    <label className="text-sm md:text-base block pb-4 font-medium">Ingresar Tercera imagen:</label>
                    <div className="space-y-5">
                    <input
                        ref={register} 
                        type="file" 
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full"  
                        id="third" 
                        name="URLImg3" 
                        accept=" image/jpg,
                        image/jpeg,
                        image/gif,
                        image/png" 
                    />
                    {errors.URLImg && <small className="userForm__small-text">{errors.URLImg.message}</small>}
                    <input
                        ref={register} 
                        type="text" 
                        className="border-2  border-gray-200 
                            focus:outline-none 
                            focus:border-blue-300 p-2 p-3 w-full"  
                        name="textImg3" 
                        placeholder="Texto de la imagen" 
                    />
                    {errors.textImg && <small className="userForm__small-text">{errors.textImg.message}</small>}
                    </div>
                </div>
                <div className="form-btn">
                    <button  type="submit" className="userForm__submitBtn" >Submit</button>
                </div>
           </form>
       </div>
     );
}
 
export default FormEditHome;