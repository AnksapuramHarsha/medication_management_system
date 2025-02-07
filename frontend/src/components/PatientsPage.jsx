import React from 'react'
import { useState,useEffect } from 'react';
import fetchData from './fetchData';
import addData from './addData'
import deleteData from './deleteData';
import updateData from './updateData';

const PatientsPage = () => {

    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "" });
    const [editPatient, setEditPatient] = useState(null);

    useEffect(() => { fetchData("patients", setPatients); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addData("patients", newPatient, setPatients);
        setNewPatient({ name: "", age: "", gender: "" });
    };

    const handleDelete = (id) => {
        deleteData("patients", id, setPatients);
    };

    const handleEdit = (pat) => {
        setEditPatient(pat);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateData("patients", editPatient.id, editPatient, setPatients);
        setEditPatient(null);
    };

    return (
        <div>
            <h2>Patients</h2>
            <ul>
                {patients.map((pat) => (
                    <li key={pat.id}>{pat.name} - Age: {pat.age}, Gender: {pat.gender}
                    <button onClick={() => handleEdit(pat)}>Edit</button>
                    <button onClick={() => handleDelete(pat.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Patient</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value })} required />
                <input type="number" placeholder="Age" value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value })} required />
                <input type="text" placeholder="Gender" value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value })} required />
                <button type="submit">Add</button>
            </form>
            {editPatient && (
                <div className="popup">
                    <h3>Edit Patient</h3>
                    <form onSubmit={handleUpdate}>
                        <input type="text" value={editPatient.name} onChange={(e) => setEditPatient({...editPatient, name: e.target.value })} required />
                        <input type="number" value={editPatient.age} onChange={(e) => setEditPatient({...editPatient, age: e.target.value })} required />
                        <input type="text" value={editPatient.gender} onChange={(e) => setEditPatient({...editPatient, gender: e.target.value })} required />
                        <button type="submit">Update</button>
                        <button onClick={() => setEditPatient(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PatientsPage