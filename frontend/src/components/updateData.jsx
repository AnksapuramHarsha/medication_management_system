import axios from "axios";
import fetchData from "./fetchData";

const updateData = async (endpoint, id, updatedData, setData) => {
    const API_BASE_URL = "http://localhost:5000/api";
    try {
        await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, updatedData);
        fetchData(endpoint, setData); // ✅ Refresh updated data
    } catch (error) {
        console.error("Error updating data:", error);
    }
};

export default updateData;
