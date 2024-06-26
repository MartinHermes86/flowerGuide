import React, {useState, useEffect, FormEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {Button, Container, Spinner} from "react-bootstrap";
import {Plant} from "../types/Plant.ts";
import './PlantDetails.css';
import {Dialog, DialogActions, DialogTitle} from "@mui/material";

type PlantDetailProps = {
    deletePlant: (id: string) => void,
    updatePlant: (id: string, plant: Plant) => Promise<AxiosResponse>,
}

export default function PlantDetails(props: Readonly<PlantDetailProps>) {
    const {id} = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [openWateredAlert, setOpenWateredAlert] = useState(false);
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

    const handleWateredAlertClose = (action: string) => {
        setOpenWateredAlert(false);
        if (action === 'home') {
            navigate('/');
        } else if (action === 'details') {
            navigate(`/plants/${id}`);
        }
    };

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
        props.updatePlant(id, updatedPlant)
            .then((response) => {
                setPlant(response.data);
            })
        setOpenWateredAlert(true);
    };


    return (
        <div>
            {isUpdateMode ? (
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name"><i className="fa fa-leaf"></i>Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={plant.name || ''}
                               onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="species"><i className="fa fa-leaf"></i>Species:</label>
                        <input type="text" className="form-control" id="species" name="species"
                               value={plant.species || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"> <i className="fas fa-file-alt"></i> Description:</label>
                        <textarea className="form-control" id="description" name="description"
                                  value={plant.description || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastWatered"><i className="fas fa-tint"></i>Last Watered:</label>
                        <input type="date" className="form-control" id="lastWatered" name="lastWatered"
                               value={String(plant.lastWatered) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nextWatering"><i className="fas fa-tint"></i>Next Watering:</label>
                        <input type="date" className="form-control" id="nextWatering" name="nextWatering"
                               value={String(plant.nextWatering) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastFertilized"><i className="fas fa-seedling"></i>Last Fertilized:</label>
                        <input type="date" className="form-control" id="lastFertilized" name="lastFertilized"
                               value={String(plant.lastFertilized) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nextFertilizing"><i className="fas fa-seedling"></i>Next Fertilizing:</label>
                        <input type="date" className="form-control" id="nextFertilizing" name="nextFertilizing"
                               value={String(plant.nextFertilizing) || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="careInstructions"><i className="fas fa-spa"></i>Care Instructions:</label>
                        <textarea className="form-control" id="careInstructions" name="careInstructions"
                                  value={plant.careInstructions || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="soilRequirements"><i className="fas fa-globe"></i>Soil Requirements:</label>
                        <textarea className="form-control" id="soilRequirements" name="soilRequirements"
                                  value={plant.soilRequirements || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationRequirements"><i className="fas fa-sun"></i>Location
                            Requirements:</label>
                        <textarea className="form-control" id="locationRequirements" name="locationRequirements"
                                  value={plant.locationRequirements || ''} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fertilizingInstructions"><i className="fas fa-seedling"></i>Fertilizing
                            Instructions:</label>
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
                            <Button variant="success" onClick={handleWaterPlant}>Gießen?</Button>
                        </div>
                        <Dialog
                            open={openWateredAlert}
                            onClose={() => handleWateredAlertClose('close')}
                            aria-labelledby="alert-dialog-title"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Pflanze wurde erfolgreich gegossen!"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={() => handleWateredAlertClose('details')}>Zurück zur Pflanze</Button>
                                <Button onClick={() => handleWateredAlertClose('home')} autoFocus>
                                    Zurück zur Startseite
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </>
            )}
        </div>
    );
}