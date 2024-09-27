import axios from "axios";
axios.defaults.withCredentials = true;
const API_URI = "http://localhost:8001";
const register = formData => {
  return axios.post(API_URI + "/register", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
  }).then(response => {
    return response.data;
  }).catch(error => {
    if (error.response && error.response.status === 409) {
      // Handle conflict
      console.error('Error:', error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
      throw new Error(error.response.data.message || 'An unexpected error occurred'); 
    }
  });
};


const login = async (email, password) => {
  return axios
    .post(
      API_URI + "/login",
      { email, password },
      { withCredentials: true }
    )
    .then(response => {
      return response.data;
    });
};

const createRole = async (roleName, permissionIds) => {
    return axios.post(
        API_URI + "/roles",
        { roleName, permissionIds },
        { withCredentials: true }
    ).then(response => {
        return response.data;
    });
}

const getPermissions = async () => {
    return axios.get(API_URI + "/permissions", { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

const getRoles = async () => {
    return axios.get(API_URI + "/roles", { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

const getUsers = async () => {
    return axios.get(API_URI + "/users", { withCredentials: true})
    .then(response => {
        return response.data;
    })
}


const userService = {
  register,
  login,
  createRole,
  getPermissions,
  getRoles,
  getUsers
};

export default userService;