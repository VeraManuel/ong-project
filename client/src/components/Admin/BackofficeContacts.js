import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useWindowSize from '../../hooks/useWindowSize';


const BackofficeContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [ heigth, weigth ] = useWindowSize();
    const [responseData, setResponseData] = useState({
        state: true,
        message: "Cargando...",
      });

    let token = JSON.parse(localStorage.getItem("token"));

    const getContacts = async () => {
        try {
            const contactsRes = await axios.get(`${process.env.REACT_APP_API}/contacts`, {
                headers: {
                  Authorization: token,
                },
            });
            setContacts(contactsRes.data.data);
            setResponseData({
                state: false,
                message: ``,
              });
        } catch (error) {
            setResponseData({
                state: true,
                message: `Ha ocurrido un error ${
                  error.response ? error.response.status : 503
                } al intentar mostrar los contactos: ${error.response}`,
              });
              setTimeout(() => {
                setResponseData({ state: false, message: "" });
              }, 5000);
              console.log(responseData.message)
        }
    }

    useEffect(()=>{
        getContacts();
    }, [])

    return (
        <div className="my-10 mx-auto h-screen w-11/12">
        {contacts.length === 0 ? (
            <div>No hay contactos todavia</div>
        ) : (
            <>
            <h2 className="text-3xl my-5 text-left">Contactos</h2>
            <table className="w-full text-xs md:text-md">
                <thead>
                    <th className="border border-gray-400 px-2 py-2">Nombre</th>
                    <th className="border border-gray-400 px-2 py-2">Telefono</th>
                    <th className="border border-gray-400 px-2 py-2">Email</th>
                    {   weigth >= 440 &&
                        <th width="60%" className="border border-gray-400 px-2 py-2 text-gray-800">Mensaje</th>
                    }
                </thead>
                {
                    contacts.map((contact, index) => (
                        <tr key={`contact ${index}`}>
                            <td className="border border-gray-400 px-2 py-2">{contact.name}</td>
                            <td className="border border-gray-400 px-2 py-2">{contact.phone}</td>
                            <td className="border border-gray-400 px-2 py-2">{contact.email}</td>
                            {   weigth >= 440 &&
                                <td width="60%" className="border border-gray-400 px-2 py-2 text-left">{contact.message}</td>
                            }
                        </tr>
                    ))
                }
            </table>
            </>
        )}
        </div>
        
    )
}

export default BackofficeContacts
