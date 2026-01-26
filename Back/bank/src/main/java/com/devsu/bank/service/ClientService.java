package com.devsu.bank.service;

import com.devsu.bank.domain.model.Client;
import com.devsu.bank.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class ClientService {

    private final ClientRepository repository;

    public Flux<Client> findAll(){
        return this.repository.findAll();
    }

    public Mono<Client> save(Client client){
        return this.repository.save(client);
    }

    public Mono<Void> delete(long id){
        return this.repository.deleteById(id);
    }

}
