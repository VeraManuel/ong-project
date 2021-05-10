import React, {useState, useEffect} from 'react';
import useAxios from "../../../hooks/useAxios";
import ItemUser from "./ItemUser"

const Users = () => {
    //initial state of list users

    const [ userList, setUserList ] = useState([]);

    //hook to connect with api
    const { data, send } = useAxios();

    //useEffect to call and get data of api
    useEffect(()=>{
        try {
            const response = send({

                url: `/users/`,
    
                method: "get",

            });

            //TODO: Code to set data in state
            /*setUserList({
                ...userList,
                response
            });*/
        } catch (error) {
            console.log(error)
        }  
    },[userList]);


    return ( 
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tr className="border-b">
                <th className="text-center p-3 px-5">Nombre</th>
                <th className="text-center p-3 px-5">Apellido</th>
                <th className="text-center p-3 px-5">Email</th>
                <th className="text-center p-3 px-5">Acciòn</th>
            </tr>
            {
                userList.map(item => {
                    return <ItemUser
                            key = {item.id}
                            item={item}
                    />
                })
            }
        </table>
     );
}
 
export default Users;