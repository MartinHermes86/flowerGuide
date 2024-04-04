package com.github.martinhermes86.backend.exception;

import java.util.NoSuchElementException;

public class PlantNotFoundException extends NoSuchElementException {
    public PlantNotFoundException(String message) {
        super(message);
    }
}
