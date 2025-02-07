const pool = require("../config/db");

// Get all patients
const getPatients = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patients");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Add a new patient
const addPatient = async (req, res) => {
    const { name, age, gender } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3) RETURNING *",
            [name, age, gender]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete medication by ID
        const result = await pool.query("DELETE FROM patients WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }

        res.status(200).json({ message: "Patient deleted successfully", deletedPatient: result.rows[0] });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ error: "Error deleting patient", details: error.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender } = req.body;
        
        const result = await pool.query(
            "UPDATE patients SET name = $1, age = $2,gender= $3 WHERE id = $4 RETURNING *",
            [name, age, gender,id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Patient not found" });
        }
        
        res.status(200).json({ message: "Patient updated successfully", patient: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Error updating patient" });
    }
};

module.exports = { getPatients, addPatient, deletePatient, updatePatient };
