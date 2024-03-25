package com.github.martinhermes86.backend.model;

import java.time.LocalDate;

public record PlantDto(
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
}
