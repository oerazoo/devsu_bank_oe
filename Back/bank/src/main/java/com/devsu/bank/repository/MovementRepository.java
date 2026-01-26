package com.devsu.bank.repository;

import com.devsu.bank.domain.model.Movement;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovementRepository extends ReactiveCrudRepository<Movement, Long> {
}
