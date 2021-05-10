import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory} from "react-router-dom";

const CategoryForm = ({ match }) => {
  const { register, handleSubmit, errors } = useForm();
  const [input, setInput] = React.useState(null);
  const [responseData, setResponseData] = React.useState({
    state: false,
    message: "Cargando...",
  });

  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token"));

  let id = match.params.id || null;

  React.useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API}/categories/${id}`,{
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          const {name, description} = res.data.data;
          setInput({
            name,
            description
          });
        })
        .catch((err) => console.log(err));
    } else {
      setInput(() => ({
        name: '',
        description: '',
      }));
    }
  }, [id]);

  const onSubmit = (e) => {
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API}/categories/${id}`, input,
        {
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          console.log(res);
          setResponseData({
            state: true,
            message: "Tu categoria ha sido editada con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(()=>{
          history.push("/backoffice/category")
        })
        .catch((err) => {
          console.log(err);
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response ? err.response.status : 503
            } al editar la categoria: ${
              err.response.data[0].msg
                ? err.response.data[0].msg
                : err.response.data
                ? err.response.data
                : err
            }`,
          });

          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/categories`, input,{
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          console.log(res);
          setResponseData({
            state: true,
            message: "Tu categoria ha sido creada con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(()=>{
          history.push("/backoffice/category")
        })
        .catch((err) => {
          console.log(err);
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response ? err.response.status : 503
            } al crear la categoria: ${
              err.response.data[0].msg
                ? err.response.data[0].msg
                : err.response.data
                ? err.response.data
                : err
            }`,
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        });
    }
  };

  return ( input &&
    <div className="my-12 flex items-center justify-center">
      <div className="bg-gray-50 p-2 md:p-16 rounded shadow-2xl w-5/6 md:w-1/2">
        <h3 className="text-3xl font-bold mb-10">
          Formulario de categorias
        </h3>
      <form  onSubmit={handleSubmit(onSubmit)} 
        className="space-y-5">
        
        <div>
          <label className="block mb-1 font-bold text-gray-500 text-left">Nombre:</label>
          <input
            className="w-full border-2 border-gray-400 p-3 rounded outline-none focus:border-blue-500"
            value={input.name}
            ref={register({
              required: { value: true, message: "Nombre requerido" },
              minLength: {
                value: 6,
                message: "El nombre debe tener como minimo 6 caracteres",
              },
            })}
            name="name"
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            type="text"
          />
          {errors.name && (
            <small className="userForm__small-text">
              {errors.name.message}
            </small>
          )}
        </div>

        <div>
          <label className="block mb-1 font-bold text-gray-500 text-left">Descripcion:</label>
          <input
           className="w-full border-2 border-gray-400 p-3 rounded outline-none focus:border-blue-500"
            value={input.description}
            name="description"
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            type="text"
          />
        </div>
        <div>
          <button className="form__btn transition duration-400">Enviar</button>
        </div>
      </form>
      {responseData.state && <p>{responseData.message}</p>}
    </div>
    </div>
  );
};

export default CategoryForm;
