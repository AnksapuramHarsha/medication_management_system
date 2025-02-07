const express = require("express");
const router = express.Router();
const { getMedications, addMedication, deleteMedication, updateMedication } = require("../controllers/medicationController");



router.get("/", getMedications);
router.post("/", addMedication);
router.delete("/:id", deleteMedication);
router.put("/:id", updateMedication);

module.exports = router;
