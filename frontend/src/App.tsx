import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import PlantGallery from './components/PlantGallery';
import NewPlantForm from './components/NewPlantForm';
import PlantDetails from './components/PlantDetails';
import NavBar from './components/NavBar';
import usePlants from './hooks/usePlants';
import {PlantDto} from './types/PlantDto';

export default function App() {
    const {plants, savePlant, updatePlant, deletePlant, fetchPlants} = usePlants();

    useEffect(() => {
        fetchPlants();
    }, [fetchPlants]);

    const handleSavePlant = (e: React.FormEvent, formData: PlantDto) => {
        e.preventDefault();
        savePlant(formData);
    };

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<PlantGallery plants={plants}/>}/>
                <Route path="/new" element={<NewPlantForm savePlant={handleSavePlant}/>}/>
                <Route path="/plants/:id"
                       element={<PlantDetails updatePlant={updatePlant} deletePlant={deletePlant}/>}/>
            </Routes>
        </>
    );
}