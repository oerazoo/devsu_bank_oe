package com.devsu.bank.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String gender;

    @Column
    private Integer age;

    @Column(nullable = false)
    private String identification;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String phoneNumber;
}

