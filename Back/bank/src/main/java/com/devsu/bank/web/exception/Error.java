package com.devsu.bank.web.exception;

public record Error(
        String type,
        String message
) {}
