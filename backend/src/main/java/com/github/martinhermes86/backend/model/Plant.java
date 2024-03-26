package com.github.martinhermes86.backend.model;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public record Plant(
        @Id String id,
        String name,
        String species,
        String description,
        LocalDate lastWatered,
        LocalDate lastFertilized,
        LocalDate nextWatering,
        LocalDate nextFertilizing,
        String careInstructions,
        String soilRequirements,
        String locationRequirements,
        String fertilizingInstructions
) {
    public Plant(PlantDto plantDto) {
        this(null, plantDto.name(), plantDto.species(), plantDto.description(), plantDto.lastWatered(), plantDto.lastFertilized(), plantDto.nextWatering(), plantDto.nextFertilizing(), plantDto.careInstructions(), plantDto.soilRequirements(), plantDto.locationRequirements(), plantDto.fertilizingInstructions());
    }
}
