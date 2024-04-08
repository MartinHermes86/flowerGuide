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

    function getPlantById(id: string): Plant {
        const plantWithId = plants.filter((plant) => plant.id === id);

        if (plantWithId.length === 0) alert("Plant not found");
        else return plantWithId[0];
        return {
            id: id,
            name: "",
            species: "",
            description: "",
            lastWatered: new Date(),
            nextWatering: new Date(),
            lastFertilized: new Date(),
            nextFertilizing: new Date(),
            careInstructions: "",
            soilRequirements: "",
            locationRequirements: "",
            fertilizingInstructions: "",
        }
    }

        function savePlant(plant: PlantDto) {
            axios.post('api/plants', plant)
                .then(() => fetchPlants())
                .catch((error) => console.error(error));
        }

        function updatePlant(id: string, plant: PlantDto) {
            axios.put(`api/plants/${id}`, plant)
                .then(() => fetchPlants())
                .catch((error) => console.error(error));
        }

        function deletePlant(id: string) {
            axios.delete(`api/plants/${id}`)
                .then(() => fetchPlants())
                .catch((error) => console.error(error));
        }

        useEffect(() => fetchPlants(), []);

        return {
            plants,
            fetchPlants,
            savePlant,
            getPlantById,
            updatePlant,
            deletePlant
        }
    }