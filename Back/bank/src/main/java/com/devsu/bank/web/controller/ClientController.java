package com.devsu.bank.web.controller;

import com.devsu.bank.domain.model.Client;
import com.devsu.bank.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/clients")
@AllArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<Flux<Client>> getAll(){
        return ResponseEntity.ok(this.clientService.findAll());
    }

    @PostMapping
    public ResponseEntity<Mono<Client>> save(Client client){
        return ResponseEntity.ok(this.clientService.save(client));
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<Mono<Void>> delete(long clientId){
        return ResponseEntity.ok(this.clientService.delete(clientId));
    }
}
