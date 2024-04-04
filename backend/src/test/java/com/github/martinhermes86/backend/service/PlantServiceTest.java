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
    private final PlantService plantService = new PlantService(mockPlantRepo);

    @Test
    void testGetAllPlants() {
        //Given
        List<Plant> expected = List.of();
        //When
        when(mockPlantRepo.findAll()).thenReturn(expected);
        List<Plant> actual = new PlantService(mockPlantRepo).getAllPlants();
        //Then
        verify(mockPlantRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void testGetAllPlants_WithPlantsInDb() {
        List<Plant> expected = List.of(
                new Plant(
                        "1",
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
                ),
                new Plant(
                        "2",
                        "Tulip",
                        "Tulipa",
                        "A beautiful flower",
                        LocalDate.of(2023, 6, 1),
                        LocalDate.of(2023, 5, 15),
                        LocalDate.of(2023, 6, 8),
                        LocalDate.of(2023, 6, 15),
                        "Water regularly",
                        "Well-drained soil",
                        "Full sun",
                        "Fertilize monthly"
                )
        );

        when(mockPlantRepo.findAll()).thenReturn(expected);
        List<Plant> actual = plantService.getAllPlants();
        verify(mockPlantRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void testGetPlantById_whenPlantFound() {
        // Given
        String id = "1";
        Plant expected = new Plant(
                "1",
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
        when(mockPlantRepo.findById(id)).thenReturn(java.util.Optional.of(expected));
        Plant actual = plantService.getPlantById(id);

        // Then
        verify(mockPlantRepo).findById(id);
        assertEquals(expected, actual);
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

    @Test
    void testAddPlant() {
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
        Plant expected = new Plant(
                "1",
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
                "Fertilize monthly");

        // When
        when(mockPlantRepo.save(any(Plant.class))).thenReturn(expected);
        Plant actual = plantService.addPlant(plantDto);
        //Then
        verify(mockPlantRepo).save(any(Plant.class));
        assertEquals(expected, actual);
    }
}