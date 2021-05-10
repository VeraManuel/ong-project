import React from "react";
import Swal from "sweetalert2";
import { Link, useHistory  } from "react-router-dom";
import axios from "axios";
import { confirm, message } from "../../Alerts.js";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const [responseData, setResponseData] = React.useState({
    state: true,
    message: "Cargando...",
  });

  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/categories/`)
      .then((res) => {
        setCategories(res.data.data);
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
            err.response ? err.response.status : 503
          } al intentar mostrar las actividades: ${err.response}`,
        });
        setTimeout(() => {
          setResponseData({ state: false, message: "" });
        }, 10000);
      });
  }, []);

  const DeleteThis = (id) => {
    confirm("Esta seguro que desea eliminar esta categoria?", "", (result) => {
      if (result.value) {
        axios
          .delete(`${process.env.REACT_APP_API}/categories/${id}`)
          .then(() => {
            message("Se ha eliminado correctamente", "", "success");
          })
          .then(()=>{
            history.push("/backoffice/category")
          })
          .catch((err) => {
            message(
              "Error",
              `Ocurrio un error ${
                err.response ? err.response.status : 503
              } al eliminar la categoria: ${err.response}`,
              "error"
            );
          });
      }
    });
  };

  if (categories.length === 0) {
    return (
      <div className="container mx-auto my-20">
        <h3 className="text-3xl my-10 font-semibold">Categorias</h3>
        <p className="text-center">No hay categorias creadas</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="w-2/3 mx-auto">
          <h3 className="text-3xl my-10 font-semibold">Categorias</h3>
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  return (
                    <tr className="hover:bg-grey-lighter">
                      <td className="py-4 px-6 border-b border-grey-light">
                        {cat.name}
                      </td>

                      <td className="py-4 px-6 border-b border-grey-light">
                        <div className="flex justify-center ">
                          <Link
                            to={`/backoffice/category-form/${cat.id}`}
                            className="hover:no-underline"
                          >
                            <p className="text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-yellow-200 hover:bg-yellow-400 transition duration-500 ease-in-out">
                              Editar
                            </p>
                          </Link>
                          <p
                            onClick={() => DeleteThis(cat.id)}
                            className="cursor-pointer text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-red-200 hover:bg-red-400 transition duration-500 ease-in-out ml-1"
                          >
                            Eliminar
                          </p>
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

export default Categories;
