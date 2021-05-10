import React,{useEffect, useState,Fragment} from "react";
import { Link } from "react-router-dom";
import useAxios from '../../hooks/useAxios';
import { confirm, message } from "../../Alerts";


const BackOfficeActivities = () => {
  useEffect(() => {
    loadActivities()
  },[])
  const [activities, setActivities] = useState([]);
  const [responseData, setResponseData] = useState({
    state: true,
    message: "Cargando...",
  });
const {send} =useAxios();
  
const loadActivities = async ()=>{
  const resp = await send({url:'/activities',method:'get'})

  if (!resp.data){
    setResponseData({state:false, message:"Error de Servidor"})
    return message("", `Error en el Servidor, intente nuevamente`, "info")
  }
  if (resp.data.data){
    setActivities(resp.data.data)
    setResponseData({})
  } 
}

if (activities.length === 0&&responseData.state===true) {
    return (
      <div className="container mx-auto my-20">
        <h3 className="my-10 text-xl">Actividades</h3>
        <p className="text-center">No hay actividades creadas</p>
      </div>
    );
  } 
  if (activities.length>0){
    return (
      <div>
        <div class="w-2/3 mx-auto">
          <h3 className="text-3xl my-10 font-semibold">Actividades</h3>
          <div class="bg-white shadow-md rounded my-6">
            <table class="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {activities.map(act => {
 
                    return (
                    <Fragment>
                    <tr class="hover:bg-grey-lighter">
                      <td class="py-4 px-6 border-b border-grey-light">
                        {act.name}
                      </td>

                      <td class="py-4 px-6 border-b border-grey-light">
                        <div className="flex justify-start ">
                          <Link
                            to={`/backoffice/activity-form/${act.id}`}
                            className="hover:no-underline"
                          >
                            <p className="text-gray-700 font-bold py-1 px-3 rounded-full text-xs bg-red-200 hover:bg-red-400 transition duration-500 ease-in-out">
                              Editar
                            </p>
                          </Link>
                          {/* <Link
                            to={`/backoffice/activities/${act.id}`}
                            className="hover:no-underline"
                          >
                            <p className=" text-grey-700 font-bold py-1 px-3 rounded-full text-xs bg-blue-200 hover:bg-blue-400 transition duration-500 ease-in-out ">
                              Ver
                            </p>
                          </Link> */}
                        </div>
                      </td>
                    </tr>
                    </Fragment>)
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  if (responseData.state===false){
    return (
      <p className="container mx-auto my-20">{responseData.message}</p>
    )
  }
};

export default BackOfficeActivities;
