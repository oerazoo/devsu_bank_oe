package com.devsu.bank.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {

    @Id
    private long id;

    private String accountNumber;

    private String type;

    private String InitialBalance;

    private Boolean Status;

}

