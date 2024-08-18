import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import UserCRUD from "./components/UserCRUD";
import DronesCRUD from "./components/DronesCRUD";
import RouteCRUD from "./components/RouteCRUD";
import NaturalConditionCRUD from "./components/NaturalConditionCRUD";
import EquipmentCRUD from "./components/EquipmentCRUD";
import DroneOperatorsCRUD from "./components/DroneOperatorsCRUD";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/users" element={<UserCRUD />} />
                    <Route path="/drones" element={<DronesCRUD />} />
                    <Route path="/routes" element={<RouteCRUD />} />
                    <Route path="/natural-conditions" element={<NaturalConditionCRUD />} />
                    <Route path="/equipment" element={<EquipmentCRUD />} />
                    <Route path="/drone-operators" element={<DroneOperatorsCRUD />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;