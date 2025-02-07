const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const medicationRoutes = require("./routes/medications");
const patientRoutes = require("./routes/patients");
const prescriptionRoutes = require("./routes/prescriptions");

const app = express();

// ✅ Correct order of middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests

// ✅ Define routes after middleware
app.use("/api/medications", medicationRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.get("/", (req, res) => {
    res.send("Medication Management System API");
});

module.exports = app;
