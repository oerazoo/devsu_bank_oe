package com.devsu.bank.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movement {

    @Id
    private long id;

    private LocalDateTime date;

    private String kind;

    private Double value;

    private Double balance;

}
