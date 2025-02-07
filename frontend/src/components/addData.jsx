import axios from "axios";
import fetchData from "./fetchData";

const addData = async (endpoint, data, setData) => {
    const API_BASE_URL = "http://localhost:5000/api";
    try {
        axios.post(`${API_BASE_URL}/${endpoint}`, data);
        fetchData(endpoint, setData);
    } catch (error) {
        console.error("Error adding data:", error);
    }
};

export default addData;