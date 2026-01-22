package com.devsu.bank.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movement {

    @Id
    private long id;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column
    private String kind;

    @Column(nullable = false)
    private Double value;

    @Column(nullable = false)
    private Double balance;

}
