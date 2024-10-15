import axios from "axios";
axios.defaults.withCredentials = true;
const API_URI = "http://localhost:8001/pizza";

//get order
const getOrders = async () => {
    return axios.get(API_URI + "/orders", { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

//update status of order
const updateOrderStatus = async (orderId, status) => {
    return axios.put(API_URI + "/updateorderstatus", { orderId, status }, { withCredentials: true })
        .then(response => {
            return response.data;
        });
}

const orderService = {
    getOrders,
    updateOrderStatus
};

export default orderService;