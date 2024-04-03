import {useEffect, useState} from "react";
import {Plant} from "../types/Plant.ts";
import axios from 'axios';
import {PlantDto} from "../types/PlantDto.ts";



export default function usePlants() {
    const [plants, setPlants] = useState<Plant[]>([]);

    function fetchPlants() {
        axios.get('api/plants')
            .then((response) => {
                const plantsData = response.data.map((plant: Plant) => ({
                    ...plant,
                    lastWatered: new Date(plant.lastWatered),
                    nextWatering: new Date(plant.nextWatering),
                    lastFertilized: new Date(plant.lastFertilized),
                    nextFertilizing: new Date(plant.nextFertilizing),
                }));
                setPlants(plantsData);
            })
            .catch((error) => console.error(error));
    }

    function savePlant(plant: PlantDto) {
        axios.post('api/plants', plant)
            .then(() => fetchPlants())
            .catch((error) => console.error(error));
    }

    useEffect(() => fetchPlants(), []);

    return {
        plants,
        savePlant,
    }
}