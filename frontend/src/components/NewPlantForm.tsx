import {PlantDto} from "../types/PlantDto.ts";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Button, Alert } from "@mui/material";
import './NewPlantForm.css';

type NewPlantFormProps = {
    savePlant: (e: React.FormEvent, formData: PlantDto) => void;
}
export default function NewPlantForm(props: Readonly<NewPlantFormProps>) {
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();

    const handleAlertClose = () => {
        setOpenAlert(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            species: { value: string };
            description: { value: string };
            lastWatered: { value: string };
            lastFertilized: { value: string };
            nextWatering: { value: string };
            nextFertilizing: { value: string };
            careInstructions: { value: string };
            soilRequirements: { value: string };
            locationRequirements: { value: string };
            fertilizingInstructions: { value: string };
        };
        const formData: PlantDto = {
            name: target.name.value,
            species: target.species.value,
            description: target.description.value,
            lastWatered: new Date(target.lastWatered.value),
            lastFertilized: new Date(target.lastFertilized.value),
            nextWatering: new Date(target.nextWatering.value),
            nextFertilizing: new Date(target.nextFertilizing.value),
            careInstructions: target.careInstructions.value,
            soilRequirements: target.soilRequirements.value,
            locationRequirements: target.locationRequirements.value,
            fertilizingInstructions: target.fertilizingInstructions.value,
        };
        props.savePlant(e, formData);
        setOpenAlert(true);
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="name"><i className="fa fa-leaf"></i>Name:</label>
                    <input type="text" className="form-control" id="name" name="name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="species"><i className="fa fa-leaf"></i>Species:</label>
                    <input type="text" className="form-control" id="species" name="species" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description"> <i className="fas fa-file-alt"></i>Description:</label>
                    <input type="text" className="form-control" id="description" name="description" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastWatered"><i className="fas fa-tint"></i>Last Watered:</label>
                    <input type="date" className="form-control" id="lastWatered" name="lastWatered" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="nextWatering"><i className="fas fa-tint"></i>Next Watering:</label>
                    <input type="date" className="form-control" id="nextWatering" name="nextWatering" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastFertilized"><i className="fas fa-seedling"></i>Last Fertilized:</label>
                    <input type="date" className="form-control" id="lastFertilized" name="lastFertilized" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="nextFertilizing"><i className="fas fa-seedling"></i>Next Fertilizing:</label>
                    <input type="date" className="form-control" id="nextFertilizing" name="nextFertilizing" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="careInstructions"><i className="fas fa-spa"></i>Care Instructions:</label>
                    <input type="text" className="form-control" id="careInstructions" name="careInstructions" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="soilRequirements"><i className="fas fa-globe"></i>Soil Requirements:</label>
                    <input type="text" className="form-control" id="soilRequirements" name="soilRequirements" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="locationRequirements"><i className="fas fa-sun"></i>Location Requirements:</label>
                    <input type="text" className="form-control" id="locationRequirements" name="locationRequirements"
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="fertilizingInstructions"><i className="fas fa-seedling"></i>Fertilizing
                        Instructions:</label>
                    <input type="text" className="form-control" id="fertilizingInstructions"
                           name="fertilizingInstructions" required/>
                </div>
                <button type="submit" className="btn btn-primary">Save Plant</button>
            </form>

            {openAlert && (
                <Alert
                    onClose={handleAlertClose}
                    severity="success"
                    action={
                        <Button color="inherit" size="small" onClick={() => navigate('/')}>
                        Zurück zur Startseite
                        </Button>
                    }
                >
                    Pflanze erfolgreich hinzugefügt
                </Alert>
            )}
        </>
    );
}