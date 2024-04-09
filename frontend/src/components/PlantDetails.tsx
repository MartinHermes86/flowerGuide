import React, { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { Plant } from "../types/Plant.ts";

type PlantDetailProps = {
    deletePlant: (id: string | undefined) => void,
    updatePlant: (id: string | undefined, plant: Plant) => void,
}

export default function PlantDetails(props: Readonly<PlantDetailProps>) {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`/api/plants/${id}`)
                .then((response) => {
                    setPlant(response.data);
                })
                .catch((error) => console.error(error));
        }
    }, [id]);

    const handleDeletePlant = () => {
        if (window.confirm("Möchten Sie diese Pflanze wirklich löschen?")) {
            props.deletePlant(id);
            navigate("/");
        }
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (id && plant) {
            try {
                await axios.put(`/plants/${id}`, plant);
                setIsUpdateMode(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlant((prevPlant) => ({
            ...prevPlant,
            [name]: value,
        }) as Plant);
    };

    if (!plant) return <div>Loading...</div>;

    return (
        <div>
            {isUpdateMode ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={plant.name || ''} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Species:</label>
                        <input type="text" name="species" value={plant.species || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea name="description" value={plant.description || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Watered:</label>
                        <input type="date" name="lastWatered" value={String(plant.lastWatered) || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Next Watering:</label>
                        <input type="date" name="nextWatering" value={String(plant.nextWatering) || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Fertilized:</label>
                        <input type="date" name="lastFertilized" value={String(plant.lastFertilized) || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Next Fertilizing:</label>
                        <input type="date" name="nextFertilizing" value={String(plant.nextFertilizing) || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Care Instructions:</label>
                        <textarea name="careInstructions" value={plant.careInstructions || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Soil Requirements:</label>
                        <textarea name="soilRequirements" value={plant.soilRequirements || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Location Requirements:</label>
                        <textarea name="locationRequirements" value={plant.locationRequirements || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Fertilizing Instructions:</label>
                        <textarea name="fertilizingInstructions" value={plant.fertilizingInstructions || ''} onChange={handleChange} />
                    </div>
                    <button type="submit">Speichern</button>
                    <button type="button" onClick={() => setIsUpdateMode(false)}>Abbrechen</button>
                </form>
            ) : (
                <>
                    <h2>Pflanzendetails: {plant.name}</h2>
                    <p>{plant.species}</p>
                    <p>{plant.description}</p>
                    <p>Last Watered: {String (plant.lastWatered)}</p>
                    <p>Next Watering: {String (plant.nextWatering)}</p>
                    <p>Last Fertilized: {String (plant.lastFertilized)}</p>
                    <p>Next Fertilizing: {String (plant.nextFertilizing)}</p>
                    <p>Care Instructions: {plant.careInstructions}</p>
                    <p>Soil Requirements: {plant.soilRequirements}</p>
                    <p>Location Requirements: {plant.locationRequirements}</p>
                    <p>Fertilizing Instructions: {plant.fertilizingInstructions}</p>
                    <Button onClick={() => setIsUpdateMode(true)}>Update</Button>
                    <Button onClick={handleDeletePlant}>Löschen</Button>
                </>
            )}
        </div>
    );
}