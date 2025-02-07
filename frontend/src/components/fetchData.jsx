import axios from "axios";


const fetchData = async (endpoint, setData) => {
    const API_BASE_URL = "http://localhost:5000/api";
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        setData(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export default fetchData