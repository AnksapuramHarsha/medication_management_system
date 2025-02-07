const pool = require("../config/db");

// Get all medications
const getMedications = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM medications");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Add a new medication
const addMedication = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO medications (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteMedication = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete medication by ID
        const result = await pool.query("DELETE FROM medications WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Medication not found" });
        }

        res.status(200).json({ message: "Medication deleted successfully", deletedMedication: result.rows[0] });
    } catch (error) {
        console.error("Error deleting medication:", error);
        res.status(500).json({ error: "Error deleting medication", details: error.message });
    }
};

const updateMedication = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        
        const result = await pool.query(
            "UPDATE medications SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [name, description, id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Medication not found" });
        }
        
        res.status(200).json({ message: "Medication updated successfully", medication: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Error updating medication" });
    }
};

module.exports = { getMedications, addMedication,deleteMedication, updateMedication };
