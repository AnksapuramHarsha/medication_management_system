import React from 'react'
import { useState,useEffect } from 'react';
import fetchData from './fetchData';
import addData from './addData';
import deleteData from './deleteData';
import updateData from './updateData';

const MedicationsPage = () => {
    const [medications, setMedications] = useState([]);
    const [newMedication, setNewMedication] = useState({ name: "", description: "" });
    const [editMedication, setEditMedication] = useState(null);

    useEffect(() => { fetchData("medications", setMedications); }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      addData("medications", newMedication, setMedications);
      setNewMedication({ name: "", description: "" });
  };

  const handleDelete = (id) => {
    deleteData("medications", id, setMedications);
   };

   const handleEdit = (med) => {
    setEditMedication(med);
};

const handleUpdate = (e) => {
    e.preventDefault();
    updateData("medications", editMedication.id, editMedication, setMedications);
    setEditMedication(null);
};



  return (
    <div>
            <h2>Medications</h2>
            <ul>
                {medications.map((med) => (
                    <li key={med.id}>{med.name} - {med.description}
                        <button onClick={() => handleEdit(med)}>Edit</button>
                        <button onClick={() => handleDelete(med.id)}>Delete</button>
                    </li>

                ))}
            </ul>
            <h3>Add Medication</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={newMedication.name} onChange={(e) => setNewMedication({...newMedication, name: e.target.value })} required />
                <input type="text" placeholder="Description" value={newMedication.description} onChange={(e) => setNewMedication({...newMedication, description: e.target.value })} required />
                <button type="submit">Add</button>
            </form>
            {editMedication && (
                <div className="popup">
                    <h3>Edit Medication</h3>
                    <form onSubmit={handleUpdate}>
                        <input type="text" value={editMedication.name} onChange={(e) => setEditMedication({...editMedication, name: e.target.value })} required />
                        <input type="text" value={editMedication.description} onChange={(e) => setEditMedication({...editMedication, description: e.target.value })} required />
                        <button type="submit">Update</button>
                        <button onClick={() => setEditMedication(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
  )
}

export default MedicationsPage