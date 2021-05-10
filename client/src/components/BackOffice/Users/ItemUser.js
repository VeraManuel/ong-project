import React from 'react';

const ItemUser = ({item}) => {
    return ( 
        <tr className="border-b hover:bg-orange-100 bg-gray-100">
            <td className="p-3 px-5">{item.nombre}</td>
            <td className="p-3 px-5">{item.apellido}</td>
            <td className="p-3 px-5">{item.email}</td>
            <td className="p-3 px-5 flex justify-center">
                <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button>
                <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Eliminar</button>
            </td>
       </tr>
     );
}
 
export default ItemUser;