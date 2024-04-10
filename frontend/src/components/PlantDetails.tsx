import React, {useState, useEffect, FormEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Spinner} from "react-bootstrap";
import {Plant} from "../types/Plant.ts";
import './PlantDetails.css';

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

    const handleWaterPlant = () => {
        if (!plant || !id) return;
        const today = new Date();
        const nextWatering = new Date();
        nextWatering.setDate(today.getDate() + 7);

        const updatedPlant = {
            ...plant,
            lastWatered: today,
            nextWatering: nextWatering,
            lastFertilized: new Date(plant.lastFertilized),
            nextFertilizing: new Date(plant.nextFertilizing),
        };
        props.updatePlant(id, updatedPlant);
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
                    <Container className="plant-details-container mt-4">
                        <h2 className="detail-heading mb-4">Pflanzendetails: {plant.name}</h2>
                        <div className="plant-details mb-3">
                            <p>Art: {plant.species}</p>
                            <p>Beschreibung: {plant.description}</p>
                            <p>Zuletzt gegossen: {String(plant.lastWatered)}</p>
                            <p>Nächstes Gießen: {String(plant.nextWatering)}</p>
                            <p>Zuletzt gedüngt: {String(plant.lastFertilized)}</p>
                            <p>Nächstes Düngen: {String(plant.nextFertilizing)}</p>
                            <p>Pflegehinweise: {plant.careInstructions}</p>
                            <p>Bodenanforderungen: {plant.soilRequirements}</p>
                            <p>Standortanforderungen: {plant.locationRequirements}</p>
                            <p>Düngehinweise: {plant.fertilizingInstructions}</p>
                        </div>
                        <div className="buttons-container d-flex justify-content-start gap-2">
                            <Button variant="primary" onClick={() => setIsUpdateMode(true)}>Update</Button>
                            <Button variant="danger" onClick={handleDeletePlant}>Löschen</Button>
                            <Button variant="success" onClick={handleWaterPlant}>Gegossen</Button>
                        </div>
                    </Container>
                </>
            )}
        </div>
    );
}