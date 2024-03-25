package com.github.martinhermes86.backend.repository;

import com.github.martinhermes86.backend.model.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlantRepo extends MongoRepository<Plant, String>{
}
