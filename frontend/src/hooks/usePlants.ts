import {useEffect, useState} from "react";
import {Plant} from "../types/Plant.ts";
import axios from 'axios';
import {PlantDto} from "../types/PlantDto.ts";


export default function usePlants() {
    const [plants, setPlants] = useState<Plant[]>([]);

    function fetchPlants() {
        axios.get('/api/plants')
            .then((response) => {
                setPlants(response.data);
            })
            .catch((error) => console.error(error));
    }


    function savePlant(plant: PlantDto) {
        axios.post('/api/plants', plant)
            .then(() => fetchPlants())
            .catch((error) => console.error(error));
    }

    function updatePlant(id: string, plant: PlantDto) {
        return axios.put(`/api/plants/${id}`, plant)
            .then((response) => {
                const updatedPlant = response.data;
                setPlants((prevPlants) => prevPlants.map((p) => p.id === updatedPlant.id ? updatedPlant : p));
                return response;
            })
            .catch((error) => {
                console.error(error)
                throw error;
            });
    }

    function deletePlant(id: string) {
        axios.delete(`/api/plants/${id}`)
            .then(() => fetchPlants())
            .catch((error) => console.error(error));
    }

    useEffect(() => fetchPlants(), []);

    return {
        plants,
        savePlant,
        updatePlant,
        deletePlant
    }
}