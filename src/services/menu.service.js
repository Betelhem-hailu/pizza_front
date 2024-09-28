import axios from "axios";
axios.defaults.withCredentials = true;
const API_URI = "http://localhost:8001/pizza";

const createMenu = formData => {
  return axios.post(API_URI + "/createMenu", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }).then(response => {
    return response.data;
  }).catch(error => {
    if (error.response && error.response.status === 409) {
      // Handle conflict
      throw new Error(error);
    } else {
      // Handle other errors
      throw new Error(error || 'An unexpected error occurred'); 
    }
  });
};


const getToppings = async () => {
    return axios.get(API_URI + "/toppings", { withCredentials: true })
        .then(response => {
            return response.data;
        });
}


const menuService = {
  createMenu,
  getToppings
};

export default menuService;