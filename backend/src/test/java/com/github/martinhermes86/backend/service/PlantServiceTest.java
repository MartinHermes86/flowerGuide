package com.github.martinhermes86.backend.service;

import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.repository.PlantRepo;
import org.junit.jupiter.api.Test;

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
}