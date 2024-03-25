package com.github.martinhermes86.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.martinhermes86.backend.model.Plant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
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
        List<Plant> expected = List.of();
        //When and Then
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get("/api/plants"))
                .andExpect(status().isOk())
                .andReturn();
        List<Plant> actual = objectMapper.readValue(result.getResponse().getContentAsString(), new TypeReference<>() {});

        assertEquals(expected, actual);
    }

}