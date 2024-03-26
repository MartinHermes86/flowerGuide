package com.github.martinhermes86.backend.service;

import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import com.github.martinhermes86.backend.repository.PlantRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PlantServiceTest {

    private final PlantRepo mockPlantRepo = mock(PlantRepo.class);

    @Test
    void testGetAllPlants() {
        //Given
        List<Plant> expected = List.of();
        //When
        when(mockPlantRepo.findAll()).thenReturn(expected);
        List<Plant> actual = new PlantService(mockPlantRepo).getAllPlants();
        //Then
        assertEquals(expected, actual);
        verify(mockPlantRepo).findAll();
    }

    @Test
    void testConstructorWithPlantDto() {
        // Given
        PlantDto plantDto = new PlantDto(
                "Rose",
                "Rosa",
                "A beautiful flower",
                LocalDate.of(2023, 6, 1),
                LocalDate.of(2023, 5, 15),
                LocalDate.of(2023, 6, 8),
                LocalDate.of(2023, 6, 15),
                "Water regularly",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );

        // When
        Plant plant = new Plant(plantDto);

        // Then
        assertEquals(plantDto.name(), plant.name());
        assertEquals(plantDto.species(), plant.species());
        assertEquals(plantDto.description(), plant.description());
        assertEquals(plantDto.lastWatered(), plant.lastWatered());
        assertEquals(plantDto.lastFertilized(), plant.lastFertilized());
        assertEquals(plantDto.nextWatering(), plant.nextWatering());
        assertEquals(plantDto.nextFertilizing(), plant.nextFertilizing());
        assertEquals(plantDto.careInstructions(), plant.careInstructions());
        assertEquals(plantDto.soilRequirements(), plant.soilRequirements());
        assertEquals(plantDto.locationRequirements(), plant.locationRequirements());
        assertEquals(plantDto.fertilizingInstructions(), plant.fertilizingInstructions());
    }
}