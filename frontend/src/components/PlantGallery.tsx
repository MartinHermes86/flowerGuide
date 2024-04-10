import {Plant} from "../types/Plant.ts";
import PlantCard from "./PlantCard.tsx";
import React from "react";
import './PlantGallery.css'

type PlantGalleryProps = {
    plants: Plant[],
}
export default function PlantGallery(props: Readonly<PlantGalleryProps>) :React.ReactElement{
    return (
        <div className="plantGallery">
            {props.plants.map((plant: Plant) => (
                <PlantCard key={plant.id} plant={plant}/>
            ))}
        </div>
    )
}