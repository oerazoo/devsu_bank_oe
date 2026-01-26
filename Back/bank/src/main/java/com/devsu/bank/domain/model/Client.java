package com.devsu.bank.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("clients")
public class Client extends Person {

    @Id
    private UUID id;

    private Long clientId;

    private String password;

    private Boolean status;
}

