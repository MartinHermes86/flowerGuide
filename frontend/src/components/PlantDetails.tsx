import React, {useState, useEffect, FormEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Spinner} from "react-bootstrap";
import {Plant} from "../types/Plant.ts";

type PlantDetailProps = {
    deletePlant: (id: string) => void,
    updatePlant: (id: string, plant: Plant) => void,
}

export default function PlantDetails(props: Readonly<PlantDetailProps>) {
    const {id} = useParams<{ id: string }>();
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


    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (id && plant) {
            props.updatePlant(id, plant);
            setIsUpdateMode(false);
            navigate(`/plants/${id}`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setPlant((prevPlant) => ({
            ...prevPlant,
            [name]: value,
        }) as Plant);
    };

    if (!plant) return <Spinner animation="border" variant="primary"/>;

    const handleDeletePlant = () => {
        if (window.confirm("Möchten Sie diese Pflanze wirklich löschen?")) {
            props.deletePlant(plant.id);
            navigate("/");
        }
    };

    return (
        <div>
            {isUpdateMode ? (
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={plant.name || ''}
                               onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="species">Species:</label>
                        <input type="text" className="form-control" id="species" name="species"
                               value={plant.species || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea className="form-control" id="description" name="description"
                                  value={plant.description || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastWatered">Last Watered:</label>
                        <input type="date" className="form-control" id="lastWatered" name="lastWatered"
                               value={String(plant.lastWatered) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nextWatering">Next Watering:</label>
                        <input type="date" className="form-control" id="nextWatering" name="nextWatering"
                               value={String(plant.nextWatering) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastFertilized">Last Fertilized:</label>
                        <input type="date" className="form-control" id="lastFertilized" name="lastFertilized"
                               value={String(plant.lastFertilized) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nextFertilizing">Next Fertilizing:</label>
                        <input type="date" className="form-control" id="nextFertilizing" name="nextFertilizing"
                               value={String(plant.nextFertilizing) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="careInstructions">Care Instructions:</label>
                        <textarea className="form-control" id="careInstructions" name="careInstructions"
                                  value={plant.careInstructions || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="soilRequirements">Soil Requirements:</label>
                        <textarea className="form-control" id="soilRequirements" name="soilRequirements"
                                  value={plant.soilRequirements || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationRequirements">Location Requirements:</label>
                        <textarea className="form-control" id="locationRequirements" name="locationRequirements"
                                  value={plant.locationRequirements || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fertilizingInstructions">Fertilizing Instructions:</label>
                        <textarea className="form-control" id="fertilizingInstructions" name="fertilizingInstructions"
                                  value={plant.fertilizingInstructions || ''} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Speichern</button>
                    <button type="button" className="btn btn-secondary"
                            onClick={() => setIsUpdateMode(false)}>Abbrechen
                    </button>
                </form>
            ) : (
                <>
                    <h2>Pflanzendetails: {plant.name}</h2>
                    <p>{plant.species}</p>
                    <p>{plant.description}</p>
                    <p>Last Watered: {String(plant.lastWatered)}</p>
                    <p>Next Watering: {String(plant.nextWatering)}</p>
                    <p>Last Fertilized: {String(plant.lastFertilized)}</p>
                    <p>Next Fertilizing: {String(plant.nextFertilizing)}</p>
                    <p>Care Instructions: {plant.careInstructions}</p>
                    <p>Soil Requirements: {plant.soilRequirements}</p>
                    <p>Location Requirements: {plant.locationRequirements}</p>
                    <p>Fertilizing Instructions: {plant.fertilizingInstructions}</p>
                    <Button onClick={() => setIsUpdateMode(true)}>Update</Button>
                    <Button variant="danger" onClick={handleDeletePlant}>Löschen</Button>
                </>
            )}
        </div>
    );
}