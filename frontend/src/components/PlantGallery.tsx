import {Plant} from "../types/Plant.ts";
import PlantCard from "./PlantCard.tsx";
import React from "react";
import './PlantGallery.css'
import getWateringStatusColor from "./WateringStatus.tsx";

type PlantGalleryProps = {
    plants: Plant[],
}
export default function PlantGallery(props: Readonly<PlantGalleryProps>) :React.ReactElement{
    const statusPriority = {
        'plantCard-overdue': 1,
        'plantCard-soon': 2,
        'plantCard-normal': 3,
    };

    const sortedPlants = [...props.plants].sort((a, b) => {
        const classA = getWateringStatusColor(a.nextWatering);
        const classB = getWateringStatusColor(b.nextWatering);

        return statusPriority[classA] - statusPriority[classB];
    });

    return (
        <div className="plantGallery">
            {sortedPlants.map((plant: Plant) => (
                <PlantCard key={plant.id} plant={plant}/>
            ))}
        </div>
    )
}