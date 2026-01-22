package com.devsu.bank.repository;

import com.devsu.bank.domain.entity.Movement;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface MovementRepository extends ReactiveCrudRepository<Movement, Long> {
}
