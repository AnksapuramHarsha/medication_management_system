import axios from "axios";
import fetchData from "./fetchData";

const deleteData = async (endpoint, id, setData) => {
    const API_BASE_URL = "http://localhost:5000/api";
    try {
        await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
        fetchData(endpoint, setData);
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

export default deleteData;
