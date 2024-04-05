package com.github.martinhermes86.backend.service;

import com.github.martinhermes86.backend.exception.PlantNotFoundException;
import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import com.github.martinhermes86.backend.repository.PlantRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Test
    void testDeletePlantById_whenPlantFound() {
        // Given
        String id = "1";
        Plant plant = new Plant(
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
        //When
        when(mockPlantRepo.findById(id)).thenReturn(Optional.of(plant));
        plantService.deletePlantById(id);

        // Then
        verify(mockPlantRepo).findById(id);
        verify(mockPlantRepo).deleteById(id);
    }

    @Test
    void testDeletePlantById_whenPlantNotFound() {
        // Given
        String id = "1";
        // When
        when(mockPlantRepo.existsById(id)).thenReturn(false);
        // Then
        try {
            plantService.deletePlantById(id);
        } catch (Exception e) {
            assertEquals("Plant with id " + id + " not found", e.getMessage());
        }
    }

    @Test
    void testUpdatePlant_whenPlantFound() {
        // Given
        String id = "1";
        PlantDto plantDto = new PlantDto(
                "Rose Updated",
                "Rosa",
                "A beautiful flower",
                LocalDate.of(2023, 6, 1),
                LocalDate.of(2023, 5, 15),
                LocalDate.of(2023, 6, 8),
                LocalDate.of(2023, 6, 15),
                "Water regularly, but less in winter",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );
        Plant existingPlant = new Plant(
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
        Plant updatedPlant = new Plant(
                id,
                plantDto.name(),
                plantDto.species(),
                plantDto.description(),
                plantDto.lastWatered(),
                plantDto.lastFertilized(),
                plantDto.nextWatering(),
                plantDto.nextFertilizing(),
                plantDto.careInstructions(),
                plantDto.soilRequirements(),
                plantDto.locationRequirements(),
                plantDto.fertilizingInstructions()
        );
        // When
        when(mockPlantRepo.findById(id)).thenReturn(Optional.of(existingPlant));
        when(mockPlantRepo.save(updatedPlant)).thenReturn(updatedPlant);
        Plant actual = plantService.updatePlant(id, plantDto);
        // Then
        verify(mockPlantRepo).findById(id);
        verify(mockPlantRepo).save(updatedPlant);
        assertEquals(updatedPlant, actual);
    }

    @Test
    void testUpdatePlant_whenPlantNotFound() {
        // Given
        String id = "1";
        PlantDto plantDto = new PlantDto(
                "Rose Updated",
                "Rosa",
                "A beautiful flower",
                LocalDate.of(2023, 6, 1),
                LocalDate.of(2023, 5, 15),
                LocalDate.of(2023, 6, 8),
                LocalDate.of(2023, 6, 15),
                "Water regularly, but less in winter",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );
        // When
        when(mockPlantRepo.existsById(id)).thenReturn(false);
        // Then
        assertThrows(PlantNotFoundException.class, () -> plantService.updatePlant(id, plantDto));
    }
}