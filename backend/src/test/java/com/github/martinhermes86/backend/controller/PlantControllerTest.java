package com.github.martinhermes86.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.martinhermes86.backend.model.PlantDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

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
        mvc.perform(MockMvcRequestBuilders.get("/api/plants"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
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
}