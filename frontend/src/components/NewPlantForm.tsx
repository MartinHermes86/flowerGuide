import {PlantDto} from "../types/PlantDto.ts";
import React from "react";
import {useNavigate} from "react-router-dom";

type NewPlantFormProps = {
    savePlant: (e: React.FormEvent, formData: PlantDto) => void;
}
export default function NewPlantForm(props: Readonly<NewPlantFormProps>) {

    const navigate = useNavigate();
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
        alert("Pflanze erfolgreich hinzugefügt");
        navigate("/");
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" required/>
            </label>
            <label>
                Species:
                <input type="text" name="species" required/>
            </label>
            <label>
                Description:
                <input type="text" name="description" required/>
            </label>
            <label>
                Last Watered:
                <input type="date" name="lastWatered" required/>
            </label>
            <label>
                Last Fertilized:
                <input type="date" name="lastFertilized" required/>
            </label>
            <label>
                Next Watering:
                <input type="date" name="nextWatering" required/>
            </label>
            <label>
                Next Fertilizing:
                <input type="date" name="nextFertilizing" required/>
            </label>
            <label>
                Care Instructions:
                <input type="text" name="careInstructions" required/>
            </label>
            <label>
                Soil Requirements:
                <input type="text" name="soilRequirements" required/>
            </label>
            <label>
                Location Requirements:
                <input type="text" name="locationRequirements" required/>
            </label>
            <label>
                Fertilizing Instructions:
                <input type="text" name="fertilizingInstructions" required/>
            </label>
            <button type="submit">Save Plant</button>
        </form>
    );
}