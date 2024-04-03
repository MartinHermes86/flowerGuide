import {Plant} from "../types/Plant.ts";
import React from "react";
import './PlantCard.css';

type PlantCardProps = {
    plant: Plant,
}
export default function PlantCard(props: Readonly<PlantCardProps>) :React.ReactElement{
    return (
        <div className="plantCard">
            <h3>{props.plant.name}</h3>
            <p>{props.plant.species}</p>
            <p>{props.plant.description}</p>
            <p>Last Watered: {props.plant.lastWatered.toLocaleDateString()}</p>
            <p>Last Fertilized: {props.plant.lastFertilized.toLocaleDateString()}</p>
            <p>Next Watering: {props.plant.nextWatering.toLocaleDateString()}</p>
            <p>Next Fertilizing: {props.plant.nextFertilizing.toLocaleDateString()}</p>
            <p>Care Instructions: {props.plant.careInstructions}</p>
            <p>Soil Requirements: {props.plant.soilRequirements}</p>
            <p>Location Requirements: {props.plant.locationRequirements}</p>
            <p>Fertilizing Instructions: {props.plant.fertilizingInstructions}</p>
        </div>
    )
}