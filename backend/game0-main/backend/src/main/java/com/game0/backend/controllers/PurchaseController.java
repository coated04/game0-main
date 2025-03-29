package com.game0.backend.controllers;

import com.game0.backend.dto.PurchaseRequest;
import com.game0.backend.models.Purchase;
import com.game0.backend.service.PurchaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/purchases")
@Slf4j
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/buy")
    public Purchase buyGame(@RequestBody PurchaseRequest purchaseRequest) {
        log.info("User {} is buying game {} for price {}", purchaseRequest.getUserId(), purchaseRequest.getGameId(), purchaseRequest.getPrice());
        return purchaseService.buyGame(purchaseRequest.getUserId(), purchaseRequest.getGameId(), purchaseRequest.getPrice());
    }

    @GetMapping("/user/{userId}")
    public List<Purchase> getPurchasesByUser(@PathVariable Integer userId) {
        return purchaseService.getPurchasesByUser(userId);
    }

    @GetMapping("/game/{gameId}")
    public List<Purchase> getPurchasesByGame(@PathVariable Long gameId) {
        return purchaseService.getPurchasesByGame(gameId);
    }
}
