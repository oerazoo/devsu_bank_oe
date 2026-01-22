package com.devsu.bank.repository;

import com.devsu.bank.domain.entity.Account;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface AccountRepository extends ReactiveCrudRepository<Account, Long> {
}
