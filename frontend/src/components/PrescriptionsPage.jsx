import React from 'react'
import { useState,useEffect } from 'react';
import fetchData from './fetchData';
import addData from './addData'
import deleteData from './deleteData';
import updateData from './updateData';

const PrescriptionsPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [newPrescription, setNewPrescription] = useState({ patient_id: "", medication_id: "", dosage: "", frequency: "", start_date: "", end_date: "" });
    const [editPrescription, setEditPrescription] = useState(null);

    useEffect(() => { fetchData("prescriptions", setPrescriptions); }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      addData("prescriptions", newPrescription, setPrescriptions);
      setNewPrescription({ patient_name: "", medication_name: "", dosage: "", frequency: "", start_date: "", end_date: "" });
  };

  const handleDelete = (id) => {
    deleteData("prescriptions", id, setPrescriptions);
};

const handleEdit = (pres) => {
    setEditPrescription(pres);
};

const handleUpdate = (e) => {
    e.preventDefault();
    updateData("prescriptions", editPrescription.id, editPrescription, setPrescriptions);
    setEditPrescription(null);
};

  return (
    <div>
            <h2>Prescriptions</h2>
            <ul>
                {prescriptions.map((pres) => (
                    <li key={pres.id}>Patient Name: {pres.patient_name}  , Dosage: {pres.dosage}  ,frequency:{pres.frequency}
                        <button onClick={() => handleEdit(pres)}>Edit</button>
                        <button onClick={() => handleDelete(pres.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Prescription</h3>
            <form onSubmit={handleSubmit}>
           
                <input type="number" placeholder="Patient ID" value={newPrescription.patient_id} onChange={(e) => setNewPrescription({...newPrescription, patient_id: e.target.value })} required />
                <input type="number" placeholder="Medication ID" value={newPrescription.medication_id} onChange={(e) => setNewPrescription({...newPrescription, medication_id: e.target.value })} required />
                <input type="text" placeholder="Dosage" value={newPrescription.dosage} onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value })} required />
                <input type="text" placeholder="Frequency" value={newPrescription.frequency} onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value })} required />
                <input type="date" value={newPrescription.start_date} onChange={(e) => setNewPrescription({...newPrescription, start_date: e.target.value })} required />
                <input type="date" value={newPrescription.end_date} onChange={(e) => setNewPrescription({...newPrescription, end_date: e.target.value })} required />
                <button type="submit">Add</button>
            </form>
            {editPrescription && (
                <div className="popup">
                    <h3>Edit Prescription</h3>
                    <form onSubmit={handleUpdate}>
                        <input type="text" value={editPrescription.dosage} onChange={(e) => setEditPrescription({...editPrescription, dosage: e.target.value })} required />
                        <input type="text" value={editPrescription.frequency} onChange={(e) => setEditPrescription({...editPrescription, frequency: e.target.value })} required />
                        <input type="date" value={editPrescription.start_date} onChange={(e) => setEditPrescription({...editPrescription, start_date: e.target.value })} required />
                        <input type="date" value={editPrescription.end_date} onChange={(e) => setEditPrescription({...editPrescription, end_date: e.target.value })} required />
                        <button type="submit">Update</button>
                        <button onClick={() => setEditPrescription(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
  )
}

export default PrescriptionsPage