import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MedicationsPage from './components/MedicationsPage';
import PatientsPage from './components/PatientsPage';
import PrescriptionsPage from './components/PrescriptionsPage';

function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/prescriptions" element={<PrescriptionsPage />} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
