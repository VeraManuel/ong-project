import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import { confirm, message } from "../../Alerts";

const BackofficeTestimonials = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [responseData, setResponseData] = useState({
        state: true,
        message: "Cargando...",
    });
 
    const token = JSON.parse(localStorage.getItem("token"));

    const history = useHistory();


    const getTestimonials = async () => {
        try {
            const testimonialsRes = await axios.get(`${process.env.REACT_APP_API}/testimonials`);
            setTestimonials(testimonialsRes.data);
            setResponseData({
                state: false,
                message: ``,
            });
        } catch (error) {
            console.log(error);
            setResponseData({
                state: true,
                message: `Ha ocurrido un error ${
                  error.response ? error.response.status : 503
                } al intentar mostrar los testimonios: ${error.response}`,
              });
              setTimeout(() => {
                setResponseData({ state: false, message: "" });
              }, 5000);
        }
    };

    const confirmDelete =  (id) => {
        try {
           confirm(
            "¿Esta seguro que desea eliminar el testimonio?",
            "No podra volver atras.",
             (result) => {
                if (result.value) {
                 axios
                 .delete(`${process.env.REACT_APP_API}/testimonials/${id}`,{
                    headers: {
                      Authorization: token,
                    }})
                 .then(()=>{
                    message("Se ha eliminado el testimonio con exito", "", "success");
                 })
                 .then(()=>{
                    history.push("/backoffice/testimonials")
                  })
                }
            })
        } catch (error) {
             message(
                "Error",
                `Ocurrio un error ${
                    error.response ? error.response.status : 503
                } al eliminar el testimonio: ${error.response}`,
                "error"
            );
        }
    }

    useEffect(()=>{
        getTestimonials();
    }, []);

    return (
        <div className="h-screen">
        {testimonials.length === 0 ? (
            <div className="mt-12">No hay testimonios todavia</div>
        ) : (
            <div>
                <h2 className="text-3xl my-10 font-semibold">Testimonios</h2>
                <table className="w-4/5 md:w-3/5 mx-auto my-10 table-fixed md:table-auto">
                    <thead>
                        <th className="border border-gray-400 px-2 py-2 text-gray-800">Nombre</th>
                        <th className="border border-gray-400 px-2 py-2 text-gray-800 w-32">Acción</th>
                    </thead>

                    {
                        testimonials.map((testimonial, index) => (
                            <tr key={`testimonial ${index}`}>
                                <td className="break-words border border-gray-400 px-2 py-2 text-left">{testimonial.name}</td>
                                <td  className="border border-gray-400 px-2 py-2 text-left text-xs w-32">
                                    <div className="flex flex-col justify-between md:flex-row">
                                        <Link
                                            to={`/backoffice/testimony-form/${testimonial.id}`}
                                            className="hover:no-underline text-center"
                                        >
                                            <p className="text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-yellow-200 hover:bg-yellow-400 transition duration-500 ease-in-out">
                                            Editar
                                            </p>
                                        </Link>
                                        <button
                                            onClick={() => confirmDelete(testimonial.id)}
                                            className="hover:no-underline mt-1 md:mt-0 md:ml-1"
                                        >
                                            <p className="text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-red-200 hover:bg-red-400 transition duration-500 ease-in-out">
                                            Eliminar
                                            </p>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            )
        }
        </div>
    )
}

export default BackofficeTestimonials;