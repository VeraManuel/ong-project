import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const ActivityForm = ({ match }) => {
  const { register, handleSubmit, errors } = useForm();
  const [input, setInput] = React.useState(null);
  const [responseData, setResponseData] = React.useState({
    state: false,
    message: "Cargando...",
  });
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("token"));

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let id = match.params.id || null;

  React.useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API}/activities/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          const { name, content, image } = res.data.data;
          setInput({
            name,
            image,
            content,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setInput(() => ({
        name: "",
        image: "",
        content: "",
      }));
    }
  }, [id]);

  const onSubmit = (e) => {
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API}/activities/${id}`, input, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          setResponseData({
            state: true,
            message: "Tu  actividad ha sido editada con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(() => {
          history.push("/backoffice/activities");
        })
        .catch((err) => {
          console.log(err);
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response ? err.response.status : 503
            } al editar el contenido: ${
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
        .post(`${process.env.REACT_APP_API}/activities`, input, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log(res);
          setResponseData({
            state: true,
            message: "Tu contenido ha sido creado con exito",
          });
          setTimeout(() => {
            setResponseData({ state: false, message: "" });
          }, 5000);
        })
        .then(() => {
          history.push("/backoffice/activities");
        })
        .catch((err) => {
          console.log(err);
          setResponseData({
            state: true,
            message: `Ha ocurrido un error ${
              err.response ? err.response.status : 503
            } al crear el contenido: ${
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

  return (
    input && (
      <div className="my-12 flex items-center justify-center">
        <div className="bg-gray-50 p-2 md:p-16 rounded shadow-2xl w-5/6 md:w-1/2">
          <h3 className="text-3xl font-bold mb-10">Formulario de actividad</h3>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-1 font-bold text-gray-500 text-left">
                Nombre:
              </label>
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
                onChange={onChange}
                type="text"
              />
              {errors.name && (
                <small className="userForm__small-text">
                  {errors.name.message}
                </small>
              )}
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-500 text-left">
                Imagen:
              </label>
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
              <label className="block mb-1 font-bold text-gray-500 text-left">
                Contenido:
              </label>
              <CKEditor
                ref={register({
                  required: { value: true, message: "Contenido requerida" },
                  minLength: {
                    value: 10,
                    message:
                      "El contenido debe tener como minimo 10 caracteres",
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
              <button className="form__btn btn__width">Enviar</button>
            </div>
          </form>
          {responseData.state && <p>{responseData.message}</p>}
        </div>
      </div>
    )
  );
};

export default ActivityForm;
