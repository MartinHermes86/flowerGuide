package com.github.martinhermes86.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.martinhermes86.backend.model.Plant;
import com.github.martinhermes86.backend.model.PlantDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class PlantControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllPlants_whenEmpty() throws Exception {
        //Given
        mvc.perform(get("/api/plants"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void getPlantById_whenEmpty() throws Exception {
        //Given
        mvc.perform(get("/api/plants/4234523"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Plant with id 4234523 not found"));
    }

    @Test
    void getPlantById_and_return_it() throws Exception {
        //Given
        PlantDto plantDto = new PlantDto(
                "Rose",
                "Rosa",
                "A beautiful flower",
                null,
                null,
                null,
                null,
                "Water regularly",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );
        String plantDtoJson = objectMapper.writeValueAsString(plantDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/plants")
                .contentType("application/json")
                .content(plantDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        // When & Then
        Plant actual = objectMapper.readValue(result.getResponse().getContentAsString(), Plant.class);

        mvc.perform(MockMvcRequestBuilders.get("/api/plants/" + actual.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(plantDto)));
    }

    @Test
    void addPlant_and_return_it() throws Exception {
        //Given
        PlantDto plantDto = new PlantDto(
                "Rose",
                "Rosa",
                "A beautiful flower",
                null,
                null,
                null,
                null,
                "Water regularly",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );
        String plantDtoJson = objectMapper.writeValueAsString(plantDto);
        mvc.perform(MockMvcRequestBuilders.post("/api/plants").contentType(MediaType.APPLICATION_JSON).content(plantDtoJson)).andReturn();
        // When & Then
        mvc.perform(MockMvcRequestBuilders.post("/api/plants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(plantDto)))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(plantDto)));
    }

    @Test
    void deletePlantById_when_not_found() throws Exception {
        MvcResult result = mvc.perform(MockMvcRequestBuilders.delete("/api/plants/42343"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Plant with id 42343 not found"))
                .andReturn();

        assertEquals("Plant with id 42343 not found", result.getResponse().getContentAsString());
    }

    @Test
    void deletePlantById_when_found() throws Exception {
        //Given
        PlantDto plantDto = new PlantDto(
                "Rose",
                "Rosa",
                "A beautiful flower",
                null,
                null,
                null,
                null,
                "Water regularly",
                "Well-drained soil",
                "Full sun",
                "Fertilize monthly"
        );
        String plantDtoJson = objectMapper.writeValueAsString(plantDto);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/plants")
                .contentType("application/json")
                .content(plantDtoJson))
                .andExpect(status().isCreated())
                .andReturn();
        // When & Then
        Plant actual = objectMapper.readValue(result.getResponse().getContentAsString(), Plant.class);

        mvc.perform(MockMvcRequestBuilders.delete("/api/plants/" + actual.id()))
                .andExpect(status().isOk());
    }
}