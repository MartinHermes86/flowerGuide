package com.github.martinhermes86.backend.controller;

import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import com.github.martinhermes86.backend.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    @GetMapping
    public List<Plant> getAllPlants() {
        return plantService.getAllPlants();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Plant addPlant(@RequestBody PlantDto plantDto) {
        return plantService.addPlant(plantDto);
    }
}
