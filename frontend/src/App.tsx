import {Route, Routes} from "react-router-dom";
import PlantGallery from "./components/PlantGallery.tsx";
import usePlants from "./hooks/usePlants.ts";
import NewPlantForm from "./components/NewPlantForm.tsx";
import {PlantDto} from "./types/PlantDto.ts";
import React from "react";
import PlantDetails from "./components/PlantDetails.tsx";


export default function App() {
    const {plants, savePlant, updatePlant, deletePlant} = usePlants();

    const handleSavePlant = (e: React.FormEvent, formData: PlantDto) => {
        e.preventDefault();
        savePlant(formData);
    };

    return (

        <Routes>
            <Route path={"/"} element={<PlantGallery plants={plants}/>}/>
            <Route path={"/new"} element={<NewPlantForm savePlant={handleSavePlant}/>}/>
            <Route path={"/plants/:id"} element={<PlantDetails updatePlant={updatePlant} deletePlant={deletePlant}/>}/>
        </Routes>

    )
}


