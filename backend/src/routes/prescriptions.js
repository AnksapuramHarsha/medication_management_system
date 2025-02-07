const express = require("express");
const { getPrescriptions, addPrescription , deletePrescription, updatePrescript} = require("../controllers/prescriptionController");

const router = express.Router();

router.get("/", getPrescriptions);
router.post("/", addPrescription);
router.delete("/:id", deletePrescription);
router.put("/:id", updatePrescript);

module.exports = router;
