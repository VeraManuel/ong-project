import axios from 'axios'

const baseURL=process.env.REACT_APP_API;

let token = localStorage.getItem('token');
const header = { headers: { authorization: `Bearer ${token}`} }


function httpRequest (method, url, request) {
  return axios[method](url, request)
    .then(response => Promise.resolve(response))
    .catch(error =>{
         return error
    })
    
}

export default {
  get (url, request) {
    let fullUrl =`${baseURL}${url}`;
    return httpRequest('get', fullUrl, request, header)
  },

  delete (url, request) {
    let fullUrl =`${baseURL}${url}`;
    return httpRequest('delete', fullUrl, request, header)
  },

  post (url, request) {
    let fullUrl =`${baseURL}${url}`;
    return httpRequest('post', fullUrl, request, header)
  },

  put (url, request) {
    let fullUrl =`${baseURL}${url}`;
    return httpRequest('put', fullUrl, request,header)
  },

  patch (url, request) {
    let fullUrl =`${baseURL}${url}`;
    return httpRequest('patch', fullUrl, request, header)
  }
}