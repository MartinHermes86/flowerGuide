package com.github.martinhermes86.backend.service;

import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import com.github.martinhermes86.backend.repository.PlantRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantService {
    private final PlantRepo plantRepo;

    public List<Plant> getAllPlants() {
        return plantRepo.findAll();
    }

    public Plant addPlant(PlantDto plantDto) {
        Plant plant = new Plant(null, plantDto.name(), plantDto.species(), plantDto.description(), plantDto.lastWatered(), plantDto.lastFertilized(), plantDto.nextWatering(), plantDto.nextFertilizing(), plantDto.careInstructions(), plantDto.soilRequirements(), plantDto.locationRequirements(), plantDto.fertilizingInstructions());
        return plantRepo.save(plant);
    }
}
