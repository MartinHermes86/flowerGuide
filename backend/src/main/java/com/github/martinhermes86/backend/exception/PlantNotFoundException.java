package com.github.martinhermes86.backend.exception;

public class PlantNotFoundException extends RuntimeException{
    public PlantNotFoundException(String message) {
        super(message);
    }
}
