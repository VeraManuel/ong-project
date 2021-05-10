import axios from 'axios';

export default axios.create({
    baseURL:`${process.env.REACT_APP_API}`//Define the base URL for the api.
});
