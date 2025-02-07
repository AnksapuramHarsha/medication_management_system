const express = require("express");
const { getPatients, addPatient, deletePatient, updatePatient } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.delete("/:id", deletePatient);
router.put("/:id", updatePatient);

module.exports = router;
