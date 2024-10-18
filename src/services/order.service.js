import axios from "axios";
axios.defaults.withCredentials = true;
const API_URI = "http://localhost:8001/pizza";

//get order
const getOrders = async (filter) => {
    const params = new URLSearchParams();

    if (filter.search) params.append("searchTerm", filter.search);
    if (filter.status) params.append("status", filter.status);
    if (filter.startDate) params.append("startDate", filter.startDate); // assuming date is in Date object format
    if (filter.endDate) params.append("endDate", filter.endDate);

    const queryString = params.toString(); // Convert to query string

    return axios.get(API_URI + `/orders?${queryString}`, { withCredentials: true })
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