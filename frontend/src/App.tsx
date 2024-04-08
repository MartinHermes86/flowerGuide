import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PlantGallery from './components/PlantGallery'; // Stelle sicher, dass die Pfade zu deinen Komponenten korrekt sind
import NewPlantForm from './components/NewPlantForm';
import PlantDetails from './components/PlantDetails';
import NavBar from './components/NavBar';
import usePlants from './hooks/usePlants';
import { PlantDto } from './types/PlantDto'; // Pfad zu PlantDto anpassen

export default function App() {
    const { plants, savePlant, updatePlant, deletePlant } = usePlants();

    const handleSavePlant = (e: React.FormEvent, formData: PlantDto) => {
        e.preventDefault();
        savePlant(formData);
    };

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<PlantGallery plants={plants} />} />
                <Route path="/new" element={<NewPlantForm savePlant={handleSavePlant} />} />
                <Route path="/plants/:id" element={<PlantDetails updatePlant={updatePlant} deletePlant={deletePlant} />} />
            </Routes>
        </>
    );
}