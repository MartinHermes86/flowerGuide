package com.github.martinhermes86.backend.controller;

import com.github.martinhermes86.backend.exception.PlantNotFoundException;
import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import com.github.martinhermes86.backend.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public Plant getPlantById(@PathVariable String id) {
        return plantService.getPlantById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Plant addPlant(@RequestBody PlantDto plantDto) {
        return plantService.addPlant(plantDto);
    }

    @ExceptionHandler(PlantNotFoundException.class)
    public ResponseEntity<String> handlePlantNotFoundException(PlantNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
