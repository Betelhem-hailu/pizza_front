import axios from "axios";
axios.defaults.withCredentials = true;
const API_URI = "http://localhost:8001/pizza";
const register = formData => {
  return axios.post(API_URI + "/registerSuperAdmin", formData, {
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

const registerAdmin = formData => {
  return axios.post(API_URI + "/registerAdmin", formData).then(response => {
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


const login = async (email, password) => {
  return axios
    .post(
      API_URI + "/login",
      { email, password }
    )
    .then(response => {
      return response.data;
    });
};

const createRole = async ({roleName, permissionIds }) => {
    return axios.post(
        API_URI + "/createRole",
         {roleName, permissionIds } ,
        { withCredentials: true }
    ).then(response => {
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
}

const getPermissions = async () => {
    return axios.get(API_URI + "/permissions", { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

const getRoles = async () => {
    return axios.get(API_URI + `/roles`, { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

const getUsers = async (filter) => {
  const params = new URLSearchParams();

  if (filter.search) params.append("searchTerm", filter.search);
  if (filter.status) params.append("roleName", filter.status);

  const queryString = params.toString();
    return axios.get(API_URI + `/users?${queryString}`, { withCredentials: true})
    .then(response => {
        return response.data;
    })
}


const userService = {
  register,
  registerAdmin,
  login,
  createRole,
  getPermissions,
  getRoles,
  getUsers
};

export default userService;