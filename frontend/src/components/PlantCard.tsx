import { Plant } from "../types/Plant.ts";
import React from "react";
import { Link } from "react-router-dom";
import './PlantCard.css';
import usePlantLottie from "../hooks/useLottie.ts";
import getWateringStatusColor from "./WateringStatus.tsx";

type PlantCardProps = {
    plant: Plant,
}
export default function PlantCard(props: Readonly<PlantCardProps>) : React.ReactElement{
    const { View } = usePlantLottie();
    const statusClass = getWateringStatusColor(props.plant.nextWatering);

    return (

        <Link to={`/plants/${props.plant.id}`} className={`plantCard ${statusClass}`} style={{ textDecoration: 'none' }}>
            <div className="lottieContainer">
                {View}
            </div>
            <h3>{props.plant.name}</h3>
            <p>{props.plant.species}</p>
            <p>{props.plant.description}</p>
        </Link>
    );
}
