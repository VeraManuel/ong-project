import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import { confirm, message } from "../../Alerts";
import useWindowSize from '../../hooks/useWindowSize';


const BackOfficeNews = () => {

  const [news, setNews] = React.useState([]);
  const [responseData, setResponseData] = React.useState({
    state: true,
    message: "Cargando...",
  });
  const [height, weigth] = useWindowSize();
  
  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token"));

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/news`)
      .then((res) => {
        console.log(res)
        setNews(res.data.data ? res.data.data : []);
        setResponseData({
          state: false,
          message: ``,
        });
      })
      .catch((err) => {
        console.log(err);
        setResponseData({
          state: true,
          message: `Ha ocurrido un error ${
            err.response.status ? err.response.status : 503
          } al intentar mostrar las novedades: ${
            err.response.data.data.message
          }`,
        });
        setTimeout(() => {
          setResponseData({ state: false, message: "" });
        }, 5000);
      });
  }, []);
 

  const confirmDelete = (id) => {
    confirm(
      "¿Esta seguro que desea eliminar la novedad?",
      "No podra volver atras.",
      (result) => {
        if (result.value) {
          axios
            .delete(`${process.env.REACT_APP_API}/news/${id}`,{
              headers: {       
                Authorization: token,
              }})
            .then(() => {
              message("Se ha eliminado la novedad con exito", "", "success");
            })
            .then(()=>{
              history.push("/backoffice/news")
            })
            .catch((err) => {
              message(
                "Error",
                `Ha ocurrido un error ${
                  err.response.status ? err.response.status : 503
                } al intentar eliminar la novedad: ${
                  err.response.data.data.message
                }`,
                "error"
              );
            });
        }
      }
    );
  };

  if (news.length === 0) {
    return (
      <div className="container mx-auto my-20">
        <h3 className="text-3xl my-10 font-semibold">Novedades</h3>
        <p className="text-center">No hay novedades creadas</p>
      </div>
    );
  } else {
    return (
      <div>
        <div class="w-11/12 md:w-2/3 mx-auto">
          <h3 className="text-3xl my-10 font-semibold">Novedades</h3>
          <div class="bg-white shadow-md rounded my-6">
            <table class="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th class="py-4  px-2 md:px-6 bg-grey-lightest font-bold uppercase  text-xs md:text-base text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  { weigth >= 1300 &&
                    <th class="py-4  px-2 md:px-6 bg-grey-lightest font-bold uppercase text-xs md:text-base text-grey-dark border-b border-grey-light">
                      Imagen
                    </th>
                  }
                  { weigth >= 400 &&
                    <th class="py-4 px-2  md:px-6 bg-grey-lightest font-bold uppercase text-xs md:text-base  text-grey-dark border-b border-grey-light">
                      Fecha de creacion
                    </th>
                  }
                  <th class="py-4  px-2  md:px-6 bg-grey-lightest font-bold uppercase text-xs md:text-base text-grey-dark border-b border-grey-light">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {news.map((n) => {
                  return (
                    <tr class="hover:bg-grey-lighter">
                      <td class="text-xs md:text-base md:py-4 px-2 md:px-6 border-b border-grey-light">
                        {n.name}
                      </td>
                      { weigth >= 1300 &&
                        <td class=" text-xs md:text-base md:py-4 px-2  md:px-6 border-b border-grey-light">
                          {n.image}
                        </td>
                      }
                      { weigth >= 400 &&
                        <td class=" text-xs md:text-base md:py-4  px-2 md:px-6 border-b border-grey-light">
                        <Moment format="D MMM YYYY hh:mm">{n.createdAt}</Moment>
                        </td>
                      }
                      <td class=" text-xs md:text-base md:py-4  px-2  md:px-6 border-b border-grey-light">
                        <div className="md:flex justify-around">
                  
                          <Link
                            to={`/backoffice/news-form/${n.id}`}
                            className="hover:no-underline"
                          >
                            <p className="  text-center  md:my-0   my-3 text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-yellow-200 hover:bg-yellow-400 transition duration-500 ease-in-out">
                              Editar
                            </p>
                          </Link>
                          <div className="  text-center  md:my-0   my-3 text-gray-700  py-1 px-3 rounded-full text-xs bg-red-200 hover:bg-red-400 transition duration-500 ease-in-out">
                            <button
                              onClick={() => confirmDelete(n.id)}
                              className="hover:no-underline"
                            >
                              <p className="font-bold">Eliminar</p>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {responseData.state && (
          <p className="container mx-auto my-20">{responseData.message}</p>
        )}
      </div>
    );
  }
};

export default BackOfficeNews;
