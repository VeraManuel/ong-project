import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory} from "react-router-dom";

const NewsForm = ({ match }) => {

  const { register, handleSubmit, errors } = useForm();

  const [input, setInput] = React.useState(null);
  const [responseData, setResponseData] = React.useState({
    state: false,
    message: "Cargando...",
  });
  const [categories, setCategories] = React.useState([]);

  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token"));

  let id = match.params.id || null;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (id) {
        axios
          .get(`${process.env.REACT_APP_API}/news/${id}`,{
          headers: {
            Authorization: token,
          }})
          .then((res) => {
            setInput({
              name: res.data.data.name,
              content: res.data.data.content,
              image: res.data.data.image ? res.data.data.image : "",
              categoryId: res.data.data.categoryId ? res.data.data.categoryId : "",
            });
          })
          .catch((err) => {
            setResponseData({
              state: true,
              message: `Ha ocurrido un error ${
                err.response.status ? err.response.status : 503
              } al intentar mostrar la novedad: ${
                err.response.data.data.message
              }`,
            });
          });
      }else{
        setInput({
          name: "",
          image: "",
          content: "",
          categoryId: "",
        })
      }

      axios
        .get(`${process.env.REACT_APP_API}/categories/`,{
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          setCategories(res.data.data);
          if(input){
            setInput({ ...input, categoryId: res.data.data[0].id });
          }
        })
        .catch((err) => {
          console.log({err});
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response.status ? err.response.status : 503
            } al intentar mostrar las opciones de categorias: ${
              err.response.data.data.message
            }`,
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 10000);
        });
        
    }
    return () => {
      mounted = false;
    };
  }, []);

  const onSubmit = (e) => {
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API}/news/${id}`, input,{
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          setResponseData({
            state: true,
            message: "Tu novedad ha sido editada con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(()=>{
          history.push("/backoffice/news")
        })
        .catch((err) => {
          console.log(err.response.data)
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response.status ? err.response.status : 503
            } al editar la novedad`,
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/news`, input,{
          headers: {
            Authorization: token,
          }})
        .then((res) => {
          setResponseData({
            state: true,
            message: "Tu novedad ha sido creada con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(()=>{
          history.push("/backoffice/news")
        })
        .catch((err) => {
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response.status ? err.response.status : 503
            } al crear la novedad: ${err.response.data.data.message}`,
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        });
    }
  };

  return (input &&
    <div className="my-12 flex items-center justify-center">
      <div className="bg-gray-50 p-2 md:p-16 rounded shadow-2xl w-5/6 md:w-1/2">
      <h3 className="text-3xl font-bold mb-10">Formulario de novedades</h3>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1 font-bold text-gray-500 text-left">Titulo:</label>
          <input
            className="w-full border-2 border-gray-400 p-3 rounded outline-none focus:border-blue-500"
            value={input.name}
            ref={register({
              required: { value: true, message: "Titulo requerido" },
              minLength: {
                value: 6,
                message: "El titulo debe tener como minimo 6 caracteres",
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
          <label className="block mb-1 font-bold text-gray-500 text-left">Imagen:</label>
          <input
            className="w-full border-2 border-gray-400 p-3 rounded outline-none focus:border-blue-500"
            value={input.image}
            ref={register({
              required: { value: true, message: "Imagen requerida" },
            })}
            name="image"
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            type="text"
          />
          {errors.image && (
            <small className="userForm__small-text">
              {errors.image.message}
            </small>
          )}
        </div>
        <div>
          <label className="block mb-1 font-bold text-gray-500 text-left">Categoria:</label>
          <select
            className="form__input input__width"
            value={input.categoryId}
            type="select"
            name="categoryId"
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
          >
            {categories &&
              categories.map((cat, index) => {
                if (index === 0) {
                  return (
                    <option defaultValue value={cat.id}>
                      {cat.name}
                    </option>
                  );
                } else {
                  return <option value={cat.id}>{cat.name}</option>;
                }
              })}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-bold text-gray-500 text-left">Contenido:</label>
          <CKEditor
            ref={register({
              required: { value: true, message: "Contenido requerido" },
              minLength: {
                value: 10,
                message: "El contenido debe tener como minimo 10 caracteres",
              },
            })}
            name="content"
            editor={ClassicEditor}
            data={input.content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInput({ ...input, content: data });
            }}
          />
          {errors.content && (
            <small className="userForm__small-text">
              {errors.content.message}
            </small>
          )}
        </div>
        <br />
        <div>
          <button className="form__btn transition duration-400">Enviar</button>
        </div>
      </form>
      {responseData.state && <p>{responseData.message}</p>}
    </div>
    </div>
  );
};

export default NewsForm;
