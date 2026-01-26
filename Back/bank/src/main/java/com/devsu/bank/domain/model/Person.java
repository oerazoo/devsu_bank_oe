package com.devsu.bank.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Person {

    @Id
    private UUID id;

    private String name;

    private String gender;

    private Integer age;

    private String identification;

    private String address;

    private String phoneNumber;
}

