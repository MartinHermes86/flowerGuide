package com.github.martinhermes86.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@With
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
}
