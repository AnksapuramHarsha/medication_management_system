const pool = require("../config/db");

// Get all prescriptions
const getPrescriptions = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT prescriptions.id, patients.name AS patient_name, medications.name AS medication_name, 
                   prescriptions.dosage, prescriptions.frequency, prescriptions.start_date, prescriptions.end_date 
            FROM prescriptions
            JOIN patients ON prescriptions.patient_id = patients.id
            JOIN medications ON prescriptions.medication_id = medications.id
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Add a new prescription
const addPrescription = async (req, res) => {
    const { patient_id, medication_id, dosage, frequency, start_date, end_date } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO prescriptions (patient_id, medication_id, dosage, frequency, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [patient_id, medication_id, dosage, frequency, start_date, end_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete medication by ID
        const result = await pool.query("DELETE FROM prescriptions WHERE id = $1 RETURNING *", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        res.status(200).json({ message: "Prescription deleted successfully", deletedPatient: result.rows[0] });
    } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).json({ error: "Error deleting prescription", details: error.message });
    }
};

const updatePrescription = async (req, res) => {
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

const updatePrescript = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, medication_id, dosage, frequency, start_date, end_date } = req.body;

        const result = await pool.query(
            "UPDATE prescriptions SET patient_id = $1, medication_id = $2, dosage = $3, frequency = $4, start_date = $5, end_date = $6 WHERE id = $7 RETURNING *",
            [patient_id, medication_id, dosage, frequency, start_date, end_date, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        res.status(200).json({ message: "Prescription updated successfully", prescription: result.rows[0] });
    } catch (error) {
        console.error("Error updating prescription:", error);
        res.status(500).json({ error: "Error updating prescription" });
    }
};


module.exports = { getPrescriptions, addPrescription , deletePrescription, updatePrescript};
