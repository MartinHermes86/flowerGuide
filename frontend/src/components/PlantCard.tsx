import { Plant } from "../types/Plant.ts";
import React from "react";
import { Link } from "react-router-dom"; // Importiere Link für die Navigation
import './PlantCard.css';
import usePlantLottie from "../hooks/useLottie.ts";

type PlantCardProps = {
    plant: Plant,
}
export default function PlantCard(props: Readonly<PlantCardProps>) : React.ReactElement{
    const { View } = usePlantLottie();
    const cardStyle = {
        textDecoration: 'none'
    };

    return (
        // Verwende Link-Komponente von react-router-dom für die Weiterleitung
        <Link to={`/plants/${props.plant.id}`} className="plantCard" style={cardStyle}>
            <div className="lottieContainer">
                {View}
            </div>
            <h3>{props.plant.name}</h3>
            <p>{props.plant.species}</p>
            <p>{props.plant.description}</p>
        </Link>
    );
}
