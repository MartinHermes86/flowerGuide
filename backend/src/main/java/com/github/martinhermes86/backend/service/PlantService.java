package com.github.martinhermes86.backend.service;

import com.github.martinhermes86.backend.model.Plant;
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
}
