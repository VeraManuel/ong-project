import { useState } from 'react';
import axios from '../api/axios';

const useAxios = () => {
    const [pending, setPending] = useState(false);

    const send = async({url, method='get', data=null}) => {
        setPending(true);
        
        const token = JSON.parse(localStorage.getItem("token"));
        if(token) {
            axios.defaults.headers.common["authorization"] = token;
        }

        let resp = {};
        switch(method) {
            case 'get' || 'GET':          
                resp = await axios.get(url)
                .then(response =>{
                    return response
                })
                .catch(error=>{
                    return error
                });
                setPending(false);
            break;
            case 'post' || 'POST':
                resp = await axios.post(url, data)
                .then(response =>{
                    return response
                })
                .catch(error=>{
                    return error
                });
                setPending(false);        
                break;
            case 'put' || 'PUT':
                resp = await axios.put(url, data)
                .then(response=>{
                    return response
                })
                .catch(error=>{
                    return error
                });
                setPending(false);
                break;
            case 'patch' || 'PATCH':
                resp = await axios.patch(url, data)
                .then(response=>{
                    return response
                })
                .catch(error=>{
                    return error
                });
                setPending(false);
                break;         
            case 'delete' || 'DELETE':
                    resp = await axios.delete(url)
                    .then(response=>{
                        return response
                    })
                    .catch(error=>{
                        return error
                    });
                    setPending(false);
                    break;     
        }

        return resp;
    }
    return { pending, send };
}

export default useAxios;