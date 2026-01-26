package com.devsu.bank.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ClientNotFoundException.class)
    public ResponseEntity<Error> handleNotFound(ClientNotFoundException clientNotFoundException){

        Error error = new Error("client-not-exist", clientNotFoundException.getMessage());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
