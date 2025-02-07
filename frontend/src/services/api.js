import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getMedications = async () => axios.get(`${API_BASE_URL}/medications`);
export const getPatients = async () => axios.get(`${API_BASE_URL}/patients`);
export const getPrescriptions = async () => axios.get(`${API_BASE_URL}/prescriptions`);
